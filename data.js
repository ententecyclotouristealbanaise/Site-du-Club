// ============================================================
//  ECTA SAINT-ALBAN – FICHIER DE CONTENU
//  Modifiez CE fichier chaque semaine, pas index.html !
// ============================================================

const ECTA_DATA = {

  // ----------------------------------------------------------
  // MOT DE PASSE LICENCIÉS
  // Changez uniquement la valeur entre guillemets
  // ----------------------------------------------------------
  motDePasse: "ecta2025",

  // ----------------------------------------------------------
  // ACTUALITÉS DE LA SEMAINE (3 max)
  // image : "images/ma-photo.jpg" ou laisser vide ""
  // ----------------------------------------------------------
  actualites: [
    {
      date: "Dimanche 22 février 2026",
      titre: "Sortie du dimanche",
      texte: "Rendez-vous à 9h00 devant le Stade de foot. 2 Parcours : 81 et 62 kms",
      tag: "Sortie",
      image: ""
    }
  ],

  // ----------------------------------------------------------
  // AGENDA – SORTIES ET CIRCUITS
  //
  // Chaque sortie peut avoir PLUSIEURS parcours dans "parcours" :
  //   distance : ex. "81 Kms"
  //   lien     : URL complète Openrunner (ou "" si pas encore disponible)
  //
  // Exemple avec 2 parcours :
  //   parcours: [
  //     { distance: "81 Kms", lien: "https://www.openrunner.com/route-details/XXXXXXXX" },
  //     { distance: "62 Kms", lien: "https://www.openrunner.com/route-details/XXXXXXXX" }
  //   ]
  // ----------------------------------------------------------
  agenda: [
    {
      date: "Dim. 22 Fév.",
      titre: "Circuit D10",
      parcours: [
        {
          distance: "81 Kms",
          lien: "https://www.openrunner.com/route-details/18540034"
        },
        {
          distance: "62 Kms",
          lien: "https://www.openrunner.com/route-details/18539834"
        }
      ]
    }
  ],

  // ----------------------------------------------------------
  // GALERIE PHOTOS – ALBUMS
  // couverture : chemin vers la photo de couverture
  // photos     : liste de tous les chemins des photos de l'album
  // ----------------------------------------------------------
  galerie: [
    {
      titre: "Brevet des 50 Kms",
      couverture: "images/Brevet des 50 Kms/brevet 50_01.jpg",
      photos: [
        "images/Brevet des 50 Kms/brevet 50_01.jpg",
        "images/Brevet des 50 Kms/brevet 50_02.jpg",
        "images/Brevet des 50 Kms/brevet 50_03.jpg",
        "images/Brevet des 50 Kms/brevet 50_04.jpg",
        "images/Brevet des 50 Kms/brevet 50_05.jpg",
        "images/Brevet des 50 Kms/brevet 50_06.jpg",
        "images/Brevet des 50 Kms/brevet 50_07.jpg",
        "images/Brevet des 50 Kms/brevet 50_08.jpg"
      ]
    }
  ]

};
// ============================================================
//  FIN DU FICHIER – Pour ajouter une sortie, copiez un bloc
//  { date, titre, parcours:[...] } dans le tableau agenda: []
// ============================================================
