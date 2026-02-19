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
  // ACTUALITÉS DE LA SEMAINE (3 max)
  // Pour ajouter : copiez un bloc { ... } et collez-le
  // Pour supprimer : effacez le bloc { ... } correspondant
  // ----------------------------------------------------------
  actualites: [
    {
      date: "Dimanche 22 février 2026",
      titre: "Sortie du dimanche",
      texte: "Rendez-vous à 9h00 devant le Stade. Parcours de 81 et 62 Kms.",
      tag: "Sortie",
      image: ""   // ""
    }

  ],

  // ----------------------------------------------------------
  // AGENDA – SORTIES ET CIRCUITS
  // iframe : collez ici le lien src="..." de l'intégration Openrunner
  //   → Sur Openrunner : ouvrez votre circuit
  //   → Cliquez "Partager" puis "Intégrer"
  //   → Copiez uniquement l'URL dans src="CETTE_PARTIE"
  // Si pas encore de circuit : laissez iframe: ""
  // ----------------------------------------------------------
  agenda: [
    {
      date: "Dim. 22 fév 2026.",
      titre: "Circuit D10",
      distance: "82 et 61 Kms",
      type: "sortie",   // sortie du Dimanche Matin
      description: "Départ salle du Stade à 9h00.",
      iframe: "<iframe width="100%" height="650" loading="lazy" src="https://www.openrunner.com/embed.html?code=764b644f475057323139586e6a69557459324175627234764b4730624d48436735357a5a2f434639774c6b3d3a3ad1658093ffec3121c177080e3361d3ea&lang=fr&unit=metric" style="border: none;"></iframe>"
    },
   }
  ],

  // ----------------------------------------------------------
  // GALERIE PHOTOS – ALBUMS
  // 1. Créez un dossier dans images/ sur GitHub
  // 2. Glissez-déposez vos photos dedans
  // 3. Ajoutez un bloc album ici
  // ----------------------------------------------------------
  galerie: [
    {
      titre: "Rando de la Flora 2024",
      couverture: "images/flora-2024/photo1.jpg",
      photos: [
        "images/flora-2024/photo1.jpg",
        "images/flora-2024/photo2.jpg",
        "images/flora-2024/photo3.jpg",
        "images/flora-2024/photo4.jpg"
      ]
    },
    {
      titre: "Côte de Granit Rose – Mars 2024",
      couverture: "images/granit-rose-2024/photo1.jpg",
      photos: [
        "images/granit-rose-2024/photo1.jpg",
        "images/granit-rose-2024/photo2.jpg",
        "images/granit-rose-2024/photo3.jpg"
      ]
    },
    {
      titre: "Repas de fin d'année 2024",
      couverture: "images/repas-2024/photo1.jpg",
      photos: [
        "images/repas-2024/photo1.jpg",
        "images/repas-2024/photo2.jpg"
      ]
    }
  ]

};
// ============================================================
//  FIN DU FICHIER
// ============================================================
