param(
    [string]$RootPath = ".\images",
    [string]$TimeOffset = "00:00:01",
    [switch]$Watch,
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Resolve-FfmpegPath {
    if ($env:FFMPEG_PATH -and (Test-Path $env:FFMPEG_PATH)) {
        return $env:FFMPEG_PATH
    }

    $knownPaths = @(
        'C:\Program Files\Shutter Encoder\Library\ffmpeg.exe',
        'C:\Program Files\Agent\dlls\x64\ffmpeg.exe',
        'C:\Program Files\Wondershare\Recoverit\ffmpeg.exe'
    )

    foreach ($path in $knownPaths) {
        if (Test-Path $path) {
            return $path
        }
    }

    try {
        $cmd = Get-Command ffmpeg -ErrorAction Stop
        return $cmd.Source
    } catch {
        throw "ffmpeg introuvable. Installez ffmpeg ou définissez FFMPEG_PATH."
    }
}

function Get-PosterPath {
    param([string]$VideoPath)

    $dir = Split-Path -Parent $VideoPath
    $name = [System.IO.Path]::GetFileNameWithoutExtension($VideoPath)
    return Join-Path $dir ($name + '_poster.jpg')
}

function New-PosterIfNeeded {
    param(
        [string]$VideoPath,
        [string]$FfmpegPath,
        [string]$Offset,
        [bool]$Overwrite
    )

    if (-not (Test-Path $VideoPath)) {
        return
    }

    $ext = [System.IO.Path]::GetExtension($VideoPath).ToLowerInvariant()
    if ($ext -ne '.mp4' -and $ext -ne '.webm') {
        return
    }

    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($VideoPath)
    if ($fileName.EndsWith('_poster', [System.StringComparison]::OrdinalIgnoreCase)) {
        return
    }

    $posterPath = Get-PosterPath -VideoPath $VideoPath
    if ((-not $Overwrite) -and (Test-Path $posterPath)) {
        Write-Host "[SKIP] Poster deja present: $posterPath"
        return
    }

    try {
        & $FfmpegPath -y -ss $Offset -i $VideoPath -frames:v 1 $posterPath *> $null
        if (Test-Path $posterPath) {
            Write-Host "[OK] Poster genere: $posterPath"
        } else {
            Write-Warning "[WARN] Echec generation poster: $VideoPath"
        }
    } catch {
        Write-Warning "[WARN] Erreur ffmpeg pour: $VideoPath"
    }
}

function Scan-ExistingVideos {
    param(
        [string]$TargetRoot,
        [string]$FfmpegPath,
        [string]$Offset,
        [bool]$Overwrite
    )

    $videos = Get-ChildItem -Path $TargetRoot -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Extension -match '^\.(mp4|webm)$' -and
            -not $_.BaseName.EndsWith('_poster', [System.StringComparison]::OrdinalIgnoreCase)
        }

    foreach ($video in $videos) {
        New-PosterIfNeeded -VideoPath $video.FullName -FfmpegPath $FfmpegPath -Offset $Offset -Overwrite $Overwrite
    }

    Write-Host "Scan termine: $($videos.Count) video(s) analysee(s)."
}

$resolvedRoot = Resolve-Path -Path $RootPath
$ffmpeg = Resolve-FfmpegPath

Write-Host "Dossier surveille: $resolvedRoot"
Write-Host "ffmpeg: $ffmpeg"

Scan-ExistingVideos -TargetRoot $resolvedRoot -FfmpegPath $ffmpeg -Offset $TimeOffset -Overwrite:$Force

if ($Watch) {
    $watcher = New-Object System.IO.FileSystemWatcher
    $watcher.Path = $resolvedRoot
    $watcher.Filter = '*.*'
    $watcher.IncludeSubdirectories = $true
    $watcher.EnableRaisingEvents = $true
    $watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName, LastWrite, Size'

    $action = {
        $path = $Event.SourceEventArgs.FullPath
        $change = $Event.SourceEventArgs.ChangeType

        if ($change -ne 'Created' -and $change -ne 'Changed') {
            return
        }

        $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
        if ($ext -eq '.mp4' -or $ext -eq '.webm') {
            New-PosterIfNeeded -VideoPath $path -FfmpegPath $using:ffmpeg -Offset $using:TimeOffset -Overwrite:$using:Force
        }
    }

    Register-ObjectEvent -InputObject $watcher -EventName Created -Action $action | Out-Null
    Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $action | Out-Null

    Write-Host "Mode surveillance actif. Deposez vos videos dans le dossier puis laissez ce terminal ouvert."
    while ($true) {
        Wait-Event | Out-Null
    }
}
