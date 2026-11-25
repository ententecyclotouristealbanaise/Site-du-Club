const monthLabels2027 = {
  janvier: 'Janvier', fevrier: 'Février', mars: 'Mars', avril: 'Avril',
  mai: 'Mai', juin: 'Juin', juillet: 'Juillet', aout: 'Août',
  septembre: 'Septembre', octobre: 'Octobre', novembre: 'Novembre'
};

const calendarEvents2027 = [
  {m:'janvier',n:"Trail de la Presqu'île",p:'Pleubian (22)',t:['marche'],d:'6,6 et 9,9 km',u:'https://fr.milesrepublic.com/event/trail-de-la-presquile-10694'},
  {m:'fevrier',n:"Bress'Breizh",p:"Plœuc-L'Hermitage (22)",t:['vtt'],d:'4 km indiqué sur la fiche',u:'https://fr.milesrepublic.com/event/bressbreizh-10813'},
  {m:'fevrier',n:'Trail Glazig',p:'Plourhan (22)',t:['marche'],d:'Formats annoncés : 5 à 63 km',u:'https://fr.milesrepublic.com/event/trail-glazig-1032'},
  {m:'fevrier',n:'Bouge ton cœur',p:'Paimpol (22)',t:['marche'],d:'7 km',u:'https://fr.milesrepublic.com/event/bouge-ton-coeur-12835'},
  {m:'fevrier',n:"Ultra Tour des Côtes d'Armor",p:'Lannion (22)',t:['marche'],d:'Formats annoncés : 11,5 à 92 km',u:'https://fr.milesrepublic.com/event/ultra-tour-des-cotes-darmor-953',date:'28 février 2027'},
  {m:'fevrier',n:'Les Nocturnes du Pain Chaud',p:'Lanfains (22)',t:['marche'],d:'9, 13 et 16 km',u:'https://fr.milesrepublic.com/event/les-nocturnes-du-pain-chaud-4317'},
  {m:'mars',n:"La Cyclo de l'Étoile",p:'Lanrodec (22)',t:['route'],d:'35, 90 et 120 km',u:'https://fr.milesrepublic.com/event/la-cyclo-de-letoile-12720'},
  {m:'mars',n:'Course des Lézards',p:'Lézardrieux (22)',t:['marche'],d:'10 et 19,5 km',u:'https://fr.milesrepublic.com/event/course-des-lezards-8030'},
  {m:'mars',n:"La Breizh'Asia",p:'Trégomeur (22)',t:['marche'],d:'0,4 à 10 km',u:'https://fr.milesrepublic.com/event/la-breizhasia-7747'},
  {m:'mars',n:"Yffi'Color",p:'Yffiniac (22)',t:['marche'],d:'0,3 à 5 km',u:'https://fr.milesrepublic.com/event/yffi-color-13360'},
  {m:'mars',n:"Randonnée annuelle de l'Amicale Cyclotourisme Broonaise",p:'Broons (22)',t:['route','vtt','marche'],d:'Route : 57 et 73 km · VTT : 25, 35, 40 et 45 km · marche : 7, 10 et 14 km',u:'https://www.nafix.fr/sortie/fiche-randonnee-annuelle-de-l-amicale-cyclotourisme-broonaise-95448-1.html',date:'21 mars 2027',source:'NaFix'},
  {m:'avril',n:"Landes et Bruyères – Cap d'Erquy / Cap Fréhel",p:'Erquy (22)',t:['route','marche'],d:'Formats et disciplines détaillés sur la fiche',u:'https://fr.milesrepublic.com/event/landes-et-bruyeres-cap-derquy-cap-frehel-6059',date:'24 avril 2027'},
  {m:'avril',n:'Rando La Plérinaise – printemps',p:'Plérin (22)',t:['vtt','gravel','marche'],d:'Parcours annoncés : 8 à 70 km',u:'https://fr.milesrepublic.com/event/rando-la-plerinaise-11849'},
  {m:'avril',n:'Un Souffle pour la Muco',p:'Belle-Isle-en-Terre (22)',t:['vtt','gravel','marche'],d:'Parcours annoncés : 4 à 50 km',u:'https://fr.milesrepublic.com/event/un-souffle-pour-la-muco-13503'},
  {m:'avril',n:'Rando Trélivan',p:'Trélivan (22)',t:['vtt','gravel','marche'],d:'Parcours annoncés : 8 à 82 km',u:'https://fr.milesrepublic.com/event/rando-trelivan-9234'},
  {m:'avril',n:'Trail de la Team du Pélem',p:'Saint-Nicolas-du-Pélem (22)',t:['marche'],d:'9, 14 et 28 km',u:'https://fr.milesrepublic.com/event/trail-de-la-team-du-pelem-7281',date:'25 avril 2027'},
  {m:'avril',n:'La Galopette du Trieux',p:'Pleudaniel (22)',t:['marche'],d:'0,95 à 18 km',u:'https://fr.milesrepublic.com/event/la-galopette-du-trieux-4959'},
  {m:'avril',n:'Sur les traces du loup',p:'Ploubezre (22)',t:['marche'],d:'0,7 à 15 km',u:'https://fr.milesrepublic.com/event/sur-les-traces-du-loup-9293'},
  {m:'avril',n:"Trail de la Grand'Ville",p:'Bringolo (22)',t:['marche'],d:'0,3 à 20 km',u:'https://fr.milesrepublic.com/event/trail-de-la-grandville-4793'},
  {m:'avril',n:'Course nature de Saint-Guihen',p:'Landéhen (22)',t:['marche'],d:'8 et 14 km',u:'https://fr.milesrepublic.com/event/course-nature-de-saint-guihen-6106'},
  {m:'avril',n:'Trail des Brioch',p:'Trémuson (22)',t:['marche'],d:'0,4 à 19 km',u:'https://fr.milesrepublic.com/event/trail-des-brioch-13504'},
  {m:'avril',n:'BRM de Loudéac – 300 km',p:'Loudéac (22)',t:['route'],d:'300 km',u:'https://bretagne.ffvelo.fr/2026/10/21/brm-loudeac-2027/',date:'18 avril 2027',source:'FFVélo Bretagne'},
  {m:'mai',n:'Rallye Nordique de la Rance',p:'Lanvallay (22)',t:['marche'],d:'8 km',u:'https://fr.milesrepublic.com/event/rallye-nordique-de-la-rance-1357',date:'2 mai 2027'},
  {m:'mai',n:'Courons dans le bois',p:'Trégueux (22)',t:['marche'],d:'9,9 et 10 km',u:'https://fr.milesrepublic.com/event/courons-dans-le-bois-13569'},
  {m:'mai',n:'Trail de Saint-Maudez',p:'Quemper-Guézennec (22)',t:['marche'],d:'1, 10, 12 et 18 km',u:'https://fr.milesrepublic.com/event/trail-de-saint-maudez-6752'},
  {m:'mai',n:"L'Arguerace",p:'Plancoët (22)',t:['marche'],d:'8, 10 et 17 km',u:'https://fr.milesrepublic.com/event/larguerace-8131'},
  {m:'mai',n:'Color Run Les Champs-Géraux',p:'Les Champs-Géraux (22)',t:['marche'],d:'2, 4 et 10 km',u:'https://fr.milesrepublic.com/event/color-run-les-champs-geraux-15601'},
  {m:'mai',n:'Trail en Guirec',p:'Perros-Guirec (22)',t:['marche'],d:'10 et 25 km',u:'https://fr.milesrepublic.com/event/trail-en-guirec-6708'},
  {m:'mai',n:'La Breizh’Flandrienne',p:'Penguily (22)',t:['route','gravel'],d:'Gravel : 50, 90 et 120 km · cyclo : 55, 90 et 120 km',u:'https://fr.milesrepublic.com/event/la-breizhflandrienne-9277'},
  {m:'mai',n:"22ème virade de l'émeraude",p:'Créhen (22)',t:['vtt','marche'],d:'Parcours et informations complémentaires à venir',u:'https://www.nafix.fr/sortie/fiche-22eme-virade-de-l-emeraude-94790-1.html',date:'23 mai 2027',source:'NaFix'},
  {m:'mai',n:'Brevet 200 km',p:'Matignon (22)',t:['route'],d:'200 km',u:'https://fr.milesrepublic.com/event/brevet-200-km-11613'},
  {m:'mai',n:'BRM de Loudéac – 400 km',p:'Loudéac (22)',t:['route'],d:'400 km',u:'https://bretagne.ffvelo.fr/2026/10/21/brm-loudeac-2027/',date:'15 mai 2027',source:'FFVélo Bretagne'},
  {m:'juin',n:'Randonnée des Bois',p:'Trémorel (22)',t:['route'],u:'https://fr.milesrepublic.com/event/randonnee-des-bois-11781'},
  {m:'juin',n:'Rando semi-nocturne',p:'Plouguenast-Langast (22)',t:['route','vtt','marche'],d:'8 à 40 km',u:'https://fr.milesrepublic.com/event/rando-semi-nocturne-14198'},
  {m:'juin',n:'La Gravel des Brasseurs',p:'Dinan (22)',t:['gravel'],d:'65 et 105 km',u:'https://fr.milesrepublic.com/event/la-gravel-des-brasseurs-13676'},
  {m:'juin',n:'La Briacine',p:'Bourbriac (22)',t:['route'],d:'50 et 100 km',u:'https://fr.milesrepublic.com/event/la-briacine-14271'},
  {m:'juin',n:'Trail du Menez Bré',p:'Louargat (22)',t:['marche'],d:'8, 9 et 17 km',u:'https://fr.milesrepublic.com/event/trail-du-menez-bre-7265',date:'6 juin 2027'},
  {m:'juin',n:'La Ploreçoise',p:'Plorec-sur-Arguenon (22)',t:['marche'],d:'8, 16 et 26 km',u:'https://fr.milesrepublic.com/event/la-plorecoise-13951'},
  {m:'juin',n:'La Douce Échappée',p:'Saint-Brieuc (22)',t:['marche'],d:'8 et 12 km',u:'https://fr.milesrepublic.com/event/la-douche-echappee-10962'},
  {m:'juin',n:'Mon cœur, ma vie, mon soleil',p:'Plélan-le-Petit (22)',t:['marche'],d:'0,6 à 13 km',u:'https://fr.milesrepublic.com/event/mon-coeur-ma-vie-mon-soleil-11333'},
  {m:'juin',n:'Foulée nature Pommeret',p:'Pommeret (22)',t:['marche'],d:'0,8 à 14 km',u:'https://fr.milesrepublic.com/event/foulee-nature-pommeret-6926'},
  {m:'juin',n:'Trail des Châteaux',p:'Tonquédec (22)',t:['marche'],d:'9,9, 10 et 18 km',u:'https://fr.milesrepublic.com/event/trail-des-chateaux-5380'},
  {m:'juin',n:'Corrida de Langueux',p:'Langueux (22)',t:['marche'],d:'0,4 à 30 km',u:'https://fr.milesrepublic.com/event/la-corrida-de-langueux-2704'},
  {m:'juin',n:'Foulées de Rando Nature',p:'Trélévern (22)',t:['marche'],d:'8 et 16 km',u:'https://fr.milesrepublic.com/event/foulees-de-rando-nature-5384'},
  {m:'juin',n:'BRM de Loudéac – 600 km',p:'Loudéac (22)',t:['route'],d:'600 km',u:'https://bretagne.ffvelo.fr/2026/10/21/brm-loudeac-2027/',date:'12–13 juin 2027',source:'FFVélo Bretagne'},
  {m:'juillet',n:'La Plouisyenne',p:'Plouisy (22)',t:['route'],d:'48, 85 et 100 km',u:'https://fr.milesrepublic.com/event/la-plouisyenne-15041'},
  {m:'juillet',n:"Trail de l'Ic",p:'Pordic (22)',t:['marche'],d:'10 à 25 km',u:'https://fr.milesrepublic.com/event/trail-de-lic-5507'},
  {m:'juillet',n:'Trail des Craquelins',p:'Plumaudan (22)',t:['marche'],d:'11 et 18 km',u:'https://fr.milesrepublic.com/event/trail-des-craquelins-11425'},
  {m:'juillet',n:'Binic Randonnée',p:'Binic-Étables-sur-Mer (22)',t:['marche'],d:'10 et 21 km',u:'https://fr.milesrepublic.com/event/binic-randonnee-11877'},
  {m:'juillet',n:'20 km de la Côte de Granit Rose',p:'Caouënnec-Lanvézéac (22)',t:['marche'],d:'6,6 à 20 km',u:'https://fr.milesrepublic.com/event/20-km-de-la-cote-de-granit-rose-5457'},
  {m:'aout',n:'15 Août Penguilais',p:'Penguily (22)',t:['vtt','marche'],d:'Formats annoncés : 8, 13, 17 et 90 km',u:'https://fr.milesrepublic.com/event/15-aout-penguilais-14064'},
  {m:'aout',n:'La Rando de l’Agglo',p:'Saint-Brieuc (22)',t:['route'],d:'70 et 90 km',u:'https://fr.milesrepublic.com/event/la-rando-de-lagglo-11626'},
  {m:'aout',n:'Rando Agglo Tour',p:'Saint-Brieuc (22)',t:['route'],d:'60 et 80 km',u:'https://fr.milesrepublic.com/event/rando-agglo-tour-14524'},
  {m:'aout',n:'Penvénan Color',p:'Penvénan (22)',t:['marche'],d:'3 et 5 km',u:'https://fr.milesrepublic.com/event/penvenan-color-8282'},
  {m:'aout',n:'Ronde de Kérity',p:'Paimpol (22)',t:['marche'],d:'1 à 21,1 km',u:'https://fr.milesrepublic.com/event/ronde-de-kerity-2398'},
  {m:'aout',n:"Trail de l'Algue",p:'Pleubian (22)',t:['marche'],d:'0,6 à 14 km',u:'https://fr.milesrepublic.com/event/trail-de-lalgue-7286'},
  {m:'aout',n:"Foulées O2 l'Air",p:'Plourivo (22)',t:['marche'],d:'1 à 24 km',u:'https://fr.milesrepublic.com/event/foulees-o2-lair-7436'},
  {m:'septembre',n:'Randonnée sortie',p:'Ploumagoar (22)',t:['route'],u:'https://fr.milesrepublic.com/event/randonnee-sortie-11723'},
  {m:'septembre',n:'Randonnée ECTL',p:'Lamballe-Armor (22)',t:['vtt','gravel','marche'],d:'5,5 à 87 km',u:'https://fr.milesrepublic.com/event/randonnee-ectl-11724'},
  {m:'septembre',n:'Randonnée cyclotouriste',p:'Ploumagoar (22)',t:['route'],d:'30, 80 et 100 km',u:'https://fr.milesrepublic.com/event/randonnee-cyclotouriste-14609'},
  {m:'septembre',n:'Défi Michel Davy',p:'Hénon (22)',t:['route','vtt'],d:'20 à 60 km',u:'https://fr.milesrepublic.com/event/defi-michel-davy-11788'},
  {m:'septembre',n:'La André Paugam',p:'Ploubezre (22)',t:['route','marche'],d:'Formats annoncés : 8 à 95 km',u:'https://fr.milesrepublic.com/event/la-andre-paugam-11787'},
  {m:'septembre',n:'Rando La Plérinaise – automne',p:'Plérin (22)',t:['vtt','gravel','marche'],d:'Parcours annoncés : 8 à 80 km',u:'https://fr.milesrepublic.com/event/rando-la-plerinaise-14711'},
  {m:'septembre',n:'La Gravel Côtes d’Armor',p:'Plédran (22)',t:['gravel'],d:'120 et 260 km',u:'https://fr.milesrepublic.com/event/la-gravel-cotes-darmor-17510'},
  {m:'septembre',n:'Les Virades de l’Espoir',p:'Erquy (22)',t:['route','marche'],d:'Formats annoncés : 5, 8, 50 et 70 km',u:'https://fr.milesrepublic.com/event/les-virades-de-l-espoir-14754'},
  {m:'septembre',n:'Trail de l’Estran',p:'Trévou-Tréguignec (22)',t:['marche'],d:'8 à 32 km',u:'https://fr.milesrepublic.com/event/trail-de-lestran-3105',date:'19 septembre 2027'},
  {m:'septembre',n:'Trail de la Vallée de l’Urne',p:'Trégueux (22)',t:['marche'],d:'1 à 28 km',u:'https://fr.milesrepublic.com/event/trail-de-la-vallee-de-lurne-506'},
  {m:'septembre',n:'Trail du Léguer',p:'Pluzunet (22)',t:['marche'],d:'10 et 16 km',u:'https://fr.milesrepublic.com/event/trail-du-leguer-7282'},
  {m:'septembre',n:'Corrida des Granitiers',p:'Le Hinglé (22)',t:['marche'],d:'0,5 à 10 km',u:'https://fr.milesrepublic.com/event/corrida-des-granitiers-7437'},
  {m:'octobre',n:'Randonnées des Châtaignes',p:'Pleslin-Trigavou (22)',t:['route','vtt','marche'],d:'9 à 75 km',u:'https://fr.milesrepublic.com/event/randonnees-des-chataignes-12140'},
  {m:'octobre',n:'La Cardon-Ragot',p:'Plumieux (22)',t:['route'],u:'https://fr.milesrepublic.com/event/la-cardon-ragot-12275'},
  {m:'octobre',n:'Octobre Rose Saint-Cast-le-Guildo',p:'Saint-Cast-le-Guildo (22)',t:['route'],u:'https://fr.milesrepublic.com/event/octobre-rose-saint-cast-le-guildo-12313'},
  {m:'octobre',n:'Rando des 3 Châteaux',p:'Châtelaudren-Plouagat (22)',t:['route'],u:'https://fr.milesrepublic.com/event/rando-des-3-chateaux-12318'},
  {m:'octobre',n:'6 heures VTT du Cré',p:'Hillion (22)',t:['vtt'],u:'https://fr.milesrepublic.com/event/6-heures-vtt-du-cre-12172'},
  {m:'octobre',n:"La Trego'Rose",p:'Tréguier (22)',t:['marche'],d:'5 et 9 km',u:'https://fr.milesrepublic.com/event/la-tregorose-9516'},
  {m:'octobre',n:'Le Kermithon',p:'Matignon (22)',t:['marche'],d:'10 et 22 km',u:'https://fr.milesrepublic.com/event/le-kermithon-8680'},
  {m:'octobre',n:'Trail Advevan',p:'Bobital (22)',t:['marche'],d:'0,4 à 30 km',u:'https://fr.milesrepublic.com/event/trail-advevan-7292'},
  {m:'octobre',n:'Trail des Chapelles',p:'Plestin-les-Grèves (22)',t:['marche'],d:'7 à 25 km',u:'https://fr.milesrepublic.com/event/trail-des-chapelles-8364'},
  {m:'novembre',n:'Randonnée des Chocards',p:'Yffiniac (22)',t:['vtt','marche'],d:'Formats annoncés : 10 à 44 km',u:'https://fr.milesrepublic.com/event/randonnee-des-chocards-12388'},
  {m:'novembre',n:'Trail dans les pas de Clément',p:'Cavan (22)',t:['marche'],d:'8 et 12 km',u:'https://fr.milesrepublic.com/event/trail-dans-les-pas-de-clement-7295'},
  {m:'novembre',n:'La Foetadenn',p:'Saint-Brieuc (22)',t:['marche'],d:'5 à 22 km',u:'https://fr.milesrepublic.com/event/la-foetadenn-15175'},
  {m:'novembre',n:'Hénantrail',p:'Hénanbihen (22)',t:['marche'],d:'0,6 à 26 km',u:'https://fr.milesrepublic.com/event/henantrail-7293'},
  {m:'novembre',n:'Mél ar Noz Trail',p:'Plouzélambre (22)',t:['marche'],d:'8 et 14 km',u:'https://fr.milesrepublic.com/event/melar-noz-trail-15364'}
];

function renderCalendar2027() {
  const groups = document.getElementById('all-groups');
  const monthOrder = Object.keys(monthLabels2027);
  groups.replaceChildren();

  monthOrder.forEach(month => {
    const events = calendarEvents2027.filter(event => event.m === month);
    if (!events.length) return;

    const section = document.createElement('section');
    section.className = 'month-group';
    section.id = 'm-' + month;
    section.dataset.month = month;
    section.innerHTML = '<div class="month-head">📅 ' + monthLabels2027[month] +
      ' 2027 <span class="month-count-badge">' + events.length + '</span></div><div class="month-cards"></div>';
    const cards = section.querySelector('.month-cards');

    events.forEach(event => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.type = event.t.join(' ');
      card.dataset.search = [event.n, event.p, event.d || ''].join(' ');

      const badge = document.createElement('span');
      badge.className = 'date-badge ' + (event.date ? 'ok' : 'tbc');
      badge.textContent = event.date ? '📅 Date publiée : ' + event.date :
        '📌 ' + monthLabels2027[month] + ' 2027 · jour à confirmer';

      const name = document.createElement('h2');
      name.className = 'card-name';
      name.textContent = event.n;

      const place = document.createElement('p');
      place.className = 'card-loc';
      place.textContent = '📍 ' + event.p;

      card.append(badge, name, place);
      if (event.d) {
        const info = document.createElement('p');
        info.className = 'card-info';
        info.textContent = event.d;
        card.append(info);
      }

      const disciplines = document.createElement('div');
      disciplines.className = 'discips';
      event.t.forEach(type => {
        const label = document.createElement('span');
        label.className = 'dl d-' + type;
        label.textContent = ({route:'Route / cyclotourisme',vtt:'VTT',gravel:'Gravel',marche:'Marche'})[type];
        disciplines.append(label);
      });
      card.append(disciplines);

      const footer = document.createElement('div');
      footer.className = 'card-foot';
      const link = document.createElement('a');
      link.className = 'bl';
      link.href = event.u;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = '↗ ' + (event.source || 'Fiche source');
      footer.append(link);
      card.append(footer);
      cards.append(card);
    });

    groups.append(section);
  });
}
