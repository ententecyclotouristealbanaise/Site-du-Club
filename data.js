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
      date: "Dimanche 23 février 2025",
      titre: "Sortie du dimanche – Circuit des Caps",
      texte: "Rendez-vous à 9h00 devant le Stade de foot. Parcours de 75 km. Prévoir coupe-vent et ravitaillement.",
      tag: "Sortie",
      image: ""
    }
  ],

  // ----------------------------------------------------------
  // AGENDA – SORTIES ET CIRCUITS
  //
  // lien : URL COMPLÈTE du circuit sur Openrunner
  //   → Ouvrez votre circuit sur openrunner.com
  //   → Copiez l'URL de la page (ex: https://www.openrunner.com/route-details/12345678)
  //   → Collez-la ici dans lien: "..."
  //   → Laissez "" si pas encore de circuit
  // ----------------------------------------------------------
  agenda: [
    {
      date: "Dim. 23 fév.",
      titre: "Circuit des Caps – Saint-Brieuc",
      distance: "75 km",
      lien: "https://www.openrunner.com/route-details/18540034"
      // Remplacez XXXXXXXX par votre vrai numéro de circuit
    }
  ],

  // ----------------------------------------------------------
  // GALERIE PHOTOS – ALBUMS
  // 1. Créez un dossier dans images/ sur GitHub
  // 2. Uploadez vos photos dedans
  // 3. Ajoutez un bloc ici
  // ----------------------------------------------------------
  galerie: [
    {
      titre: "Rando de la Flora 2024",
      couverture: "",   // ex: "images/flora-2024/photo1.jpg"
      photos: [
        // "images/flora-2024/photo1.jpg",
        // "images/flora-2024/photo2.jpg"
      ]
    }
  ]

};
// ============================================================
//  FIN DU FICHIER
// ============================================================
