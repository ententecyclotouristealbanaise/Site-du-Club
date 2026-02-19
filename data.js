// ============================================================
//  ECTA SAINT-ALBAN – FICHIER DE CONTENU
//  Modifiez CE fichier chaque semaine, pas index.html !
// ============================================================

const ECTA_DATA = {

  // ----------------------------------------------------------
  // MOT DE PASSE LICENCIÉS
  // Changez uniquement la valeur entre guillemets
  // Communiquez ce code à vos licenciés chaque saison
  // ----------------------------------------------------------
  motDePasse: "ecta2025",

  // ----------------------------------------------------------
  // ACTUALITÉS DE LA SEMAINE
  // Gardez 3 articles maximum pour un bel affichage
  // Pour ajouter un article : copiez le bloc { ... } et collez-le
  // Pour supprimer : effacez le bloc { ... } correspondant
  // image : chemin vers une photo ex: "images/ma-photo.jpg"
  //         ou laisser vide "" si pas de photo
  // ----------------------------------------------------------
  actualites: [
    {
      date: "Dimanche 22 février 2025",
      titre: "Sortie du dimanche ",
      texte: "Rendez-vous à 9h00 devant le Stade de foot. Parcours de 81 et 62 kms.",
      tag: "Sortie",
      image: ""
    }
  ],

  // ----------------------------------------------------------
  // AGENDA – SORTIES ET CIRCUITS
  // Pour chaque sortie renseignez :
  //   date       : ex "Dim. 23 fév."
  //   titre      : nom de la sortie
  //   distance   : ex "75 km"
  //   iframe     : lien src="..." de l'intégration Openrunner
  //                → Sur Openrunner : Partager → Intégrer
  //                → Copiez uniquement l'URL dans src="ICI"
  //                → Laissez "" si pas encore de circuit
  // ----------------------------------------------------------
  agenda: [
    {
      date: "Dim. 22 fév.",
      titre: "Sortie du Dimanche",
      distance: "81 et 62 Kms",
      iframe: "<iframe width="100%" height="650" loading="lazy" src="https://www.openrunner.com/embed.html?code=526561397454632f6c743869722f6a6a39356a3153323352336d786e365836466f6b5577535574673972343d3a3a41f6053a0642524e71f2a0248f12b43a&lang=fr&unit=metric" style="border: none;"></iframe>"
      // Remplacez XXXXXXX par votre identifiant de circuit Openrunner
    }
  ],

  // ----------------------------------------------------------
  // GALERIE PHOTOS – ALBUMS
  // 1. Créez un dossier dans images/ sur GitHub
  //    ex : images/flora-2025/
  // 2. Glissez-déposez vos photos dans ce dossier
  // 3. Ajoutez un bloc album ici avec les noms de fichiers
  // ----------------------------------------------------------
  galerie: [
    {
      titre: "Rando de la Flora 2024",
      couverture: "images/flora-2024/photo1.jpg",
      photos: [
        "images/flora-2024/photo1.jpg",
        "images/flora-2024/photo2.jpg",
        "images/flora-2024/photo3.jpg"
      ]
    }
  ]

};
// ============================================================
//  FIN DU FICHIER
// ============================================================
