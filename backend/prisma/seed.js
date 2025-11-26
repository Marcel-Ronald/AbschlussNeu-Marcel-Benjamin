import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🦈 Starte Seeding der Hai-Datenbank...");

  // Lösche bestehende Daten in der richtigen Reihenfolge
  await prisma.observation.deleteMany();
  await prisma.shark.deleteMany();
  await prisma.diet.deleteMany();
  await prisma.habitat.deleteMany();
  console.log("✅ Alte Daten gelöscht");

  // Erstelle Habitate
  const tropicalOcean = await prisma.habitat.create({
    data: {
      region: "Tropische Ozeane",
      temperature_range: "20-30°C",
      depth_range_m: "0-200m",
    },
  });

  const temperateOcean = await prisma.habitat.create({
    data: {
      region: "Gemäßigte Meere",
      temperature_range: "10-20°C",
      depth_range_m: "0-300m",
    },
  });

  const coldOcean = await prisma.habitat.create({
    data: {
      region: "Kalte Gewässer",
      temperature_range: "0-10°C",
      depth_range_m: "0-2000m",
    },
  });

  const deepOcean = await prisma.habitat.create({
    data: {
      region: "Tiefsee",
      temperature_range: "2-8°C",
      depth_range_m: "200-1000m",
    },
  });

  console.log("✅ Habitate erstellt");

  // Erstelle Diäten
  const carnivore = await prisma.diet.create({
    data: {
      diet_type: "Fleischfresser",
      prey_example: "Robben, Fische, Meeresschildkröten",
    },
  });

  const filterFeeder = await prisma.diet.create({
    data: {
      diet_type: "Filtrierer",
      prey_example: "Plankton, Krill, kleine Fische",
    },
  });

  const opportunist = await prisma.diet.create({
    data: {
      diet_type: "Opportunist",
      prey_example: "Fische, Krustentiere, Aas, Müll",
    },
  });

  const fishEater = await prisma.diet.create({
    data: {
      diet_type: "Fischfresser",
      prey_example: "Thunfisch, Makrele, andere Fische",
    },
  });

  console.log("✅ Diäten erstellt");

  // Erstelle Haie mit vollständigen Informationen
  const sharksData = [
    {
      name: "Weißer Hai",
      scientific_name: "Carcharodon carcharias",
      average_length_m: 4.5,
      average_weight_kg: 1000,
      lifespan_years: 70,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort:
        "Küstengewässer weltweit, besonders Kalifornien, Südafrika, Australien",
      nahrung: "Robben, Seelöwen, Fische, Meeresschildkröten, Wale (Aas)",
      gefahr: "Hoch - Verantwortlich für die meisten Haiangriffe auf Menschen",
      gewohnheiten:
        "Einzelgänger, jagt bei Sonnenaufgang und -untergang, kann große Distanzen zurücklegen, bevorzugt kühle Gewässer",
      image: "/images/sharks/white-shark.avif",
    },
    {
      name: "Hammerhai",
      scientific_name: "Sphyrna mokarran",
      average_length_m: 4.0,
      average_weight_kg: 450,
      lifespan_years: 30,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tropische und subtropische Küstengewässer weltweit",
      nahrung: "Rochen, Fische, Tintenfische, Krebstiere",
      gefahr: "Mittel - Selten aggressiv gegenüber Menschen",
      gewohnheiten:
        "Oft in Schulen unterwegs, nutzt Kopfform als Sensor, wandert saisonal, jagt am Meeresboden",
      image: "/images/sharks/hammerhai.webp",
    },
    {
      name: "Tigerhai",
      scientific_name: "Galeocerdo cuvier",
      average_length_m: 3.8,
      average_weight_kg: 600,
      lifespan_years: 50,
      habitat_id: tropicalOcean.id,
      diet_id: opportunist.id,
      geburtsort: "Tropische und subtropische Gewässer weltweit",
      nahrung: "Alles - Fische, Schildkröten, Vögel, Delfine, sogar Müll",
      gefahr: "Hoch - Zweitgefährlichster Hai für Menschen",
      gewohnheiten:
        "Nachtaktiv, Einzelgänger, 'Mülleimer des Meeres', wandert große Strecken, bevorzugt trübes Wasser",
      image: "/images/sharks/tigerhai.jpg",
    },
    {
      name: "Walhai",
      scientific_name: "Rhincodon typus",
      average_length_m: 12.0,
      average_weight_kg: 18000,
      lifespan_years: 70,
      habitat_id: tropicalOcean.id,
      diet_id: filterFeeder.id,
      geburtsort: "Warme tropische Ozeane weltweit",
      nahrung: "Plankton, kleine Fische, Krill",
      gefahr: "Keine - Völlig harmlos für Menschen",
      gewohnheiten:
        "Filtrierer, langsamer Schwimmer, oft an der Oberfläche, wandert zu planktonreichen Gebieten, friedlich",
      image: "/images/sharks/walhai.avif",
    },
    {
      name: "Blauhai",
      scientific_name: "Prionace glauca",
      average_length_m: 3.0,
      average_weight_kg: 200,
      lifespan_years: 20,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id,
      geburtsort: "Offene Ozeane weltweit in gemäßigten Zonen",
      nahrung: "Tintenfische, kleine Fische, Krebstiere",
      gefahr: "Gering - Kann neugierig sein, aber selten gefährlich",
      gewohnheiten:
        "Hochseebewohner, wandert extreme Distanzen, lebt in großen Tiefen, elegant und schnell",
      image: "/images/sharks/blauhai.jpg",
    },
    {
      name: "Grönlandhai",
      scientific_name: "Somniosus microcephalus",
      average_length_m: 5.0,
      average_weight_kg: 1000,
      lifespan_years: 400,
      habitat_id: coldOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Arktische und subarktische Gewässer",
      nahrung: "Fische, Robben, Aas, manchmal Rentiere",
      gefahr: "Sehr gering - Lebt in extremer Tiefe",
      gewohnheiten:
        "Extrem langsam, lebt in eiskaltem Wasser, kann über 400 Jahre alt werden, tiefstes Leben",
      image: "/images/sharks/Grönlandhai.jpg",
    },
    {
      name: "Weißspitzen-Riffhai",
      scientific_name: "Triaenodon obesus",
      average_length_m: 1.6,
      average_weight_kg: 18,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Korallenriffe im Indo-Pazifik",
      nahrung: "Kleine Fische, Krebstiere, Tintenfische",
      gefahr: "Sehr gering - Scheu und harmlos",
      gewohnheiten:
        "Nachtaktiv, ruht tagsüber in Höhlen, jagt in Gruppen, standorttreu, liebt Korallenriffe",
      image: "/images/sharks/Weißspitzen-Riffhai.jpg",
    },
    {
      name: "Kurzflossen-Mako",
      scientific_name: "Isurus oxyrinchus",
      average_length_m: 3.2,
      average_weight_kg: 300,
      lifespan_years: 32,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id,
      geburtsort: "Gemäßigte und tropische Ozeane weltweit",
      nahrung: "Thunfische, Schwertfische, andere Haie",
      gefahr: "Mittel - Kann aggressiv sein wenn provoziert",
      gewohnheiten:
        "Schnellster Hai (bis 60 km/h), springt aus dem Wasser, jagt aktiv, Hochseejäger",
      image: "/images/sharks/Kurzflossen-Mako.jpg",
    },
    {
      name: "Bullenhai",
      scientific_name: "Carcharhinus leucas",
      average_length_m: 2.5,
      average_weight_kg: 230,
      lifespan_years: 32,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Küstengewässer und Flussmündungen weltweit",
      nahrung: "Fische, Rochen, andere Haie, Vögel, Delfine",
      gefahr: "Sehr hoch - Extrem aggressiv, häufig in flachem Wasser",
      gewohnheiten:
        "Kann in Süßwasser leben, territorial, aggressiv, jagt in trübem Wasser, kommt oft in Flussnähe",
      image: "/images/sharks/Bullenhai.jpg",
    },
    {
      name: "Zitronenhai",
      scientific_name: "Negaprion brevirostris",
      average_length_m: 3.0,
      average_weight_kg: 180,
      lifespan_years: 27,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Subtropische Küstengewässer, Mangrovenwälder",
      nahrung: "Fische, Rochen, Krebstiere, Seevögel",
      gefahr: "Gering - Normalerweise nicht aggressiv",
      gewohnheiten:
        "Sozial, bildet Gruppen, kehrt zu Geburtsstätten zurück, nachtaktiv, intelligent",
      image: "/images/sharks/Zitronenhai.jpg",
    },
    {
      name: "Riesenhai",
      scientific_name: "Cetorhinus maximus",
      average_length_m: 8.5,
      average_weight_kg: 4000,
      lifespan_years: 50,
      habitat_id: temperateOcean.id,
      diet_id: filterFeeder.id,
      geburtsort: "Gemäßigte Gewässer weltweit",
      nahrung: "Plankton, kleine Fische",
      gefahr: "Keine - Friedlicher Filtrierer",
      gewohnheiten:
        "Zweitgrößter Hai, schwimmt mit offenem Maul, wandert saisonal, langsam, oft an Oberfläche",
      image: "/images/sharks/Riesenhai.jpg",
    },
    {
      name: "Schwarzspitzen-Riffhai",
      scientific_name: "Carcharhinus melanopterus",
      average_length_m: 1.6,
      average_weight_kg: 20,
      lifespan_years: 13,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tropische Korallenriffe im Indo-Pazifik",
      nahrung: "Kleine Fische, Tintenfische, Krebstiere",
      gefahr: "Sehr gering - Scheu vor Menschen",
      gewohnheiten:
        "Sehr aktiv, springt manchmal aus dem Wasser, lebt in flachem Wasser, jagt in Gruppen",
      image: "/images/sharks/Schwarzspitzen-Riffhai.jpg",
    },
    {
      name: "Sandtigerhai",
      scientific_name: "Carcharias taurus",
      average_length_m: 3.2,
      average_weight_kg: 160,
      lifespan_years: 35,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Subtropische und gemäßigte Küsten weltweit",
      nahrung: "Fische, kleinere Haie, Rochen, Tintenfische",
      gefahr: "Gering - Trotz furchteinflößendem Aussehen friedlich",
      gewohnheiten:
        "Schwimmt langsam, schluckt Luft für Auftrieb, nachtaktiv, ruht in Höhlen, gesellig",
      image: "/images/sharks/Sandtigerhai.jpg",
    },
    {
      name: "Fuchshai",
      scientific_name: "Alopias vulpinus",
      average_length_m: 4.5,
      average_weight_kg: 350,
      lifespan_years: 50,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id,
      geburtsort: "Gemäßigte und tropische Ozeane",
      nahrung: "Kleine Fische (Sardinen, Makrelen), Tintenfische",
      gefahr: "Sehr gering - Scheu und harmlos",
      gewohnheiten:
        "Nutzt langen Schwanz zum Jagen (betäubt Beute), springt aus Wasser, jagt in Gruppen",
      image: "/images/sharks/Fuchshai.jpg",
    },
    {
      name: "Seidenhai",
      scientific_name: "Carcharhinus falciformis",
      average_length_m: 2.5,
      average_weight_kg: 85,
      lifespan_years: 23,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id,
      geburtsort: "Tropische Hochseegewässer weltweit",
      nahrung: "Fische, Tintenfische, Krebstiere",
      gefahr: "Mittel - Kann neugierig und hartnäckig sein",
      gewohnheiten:
        "Schneller Schwimmer, folgt Thunfischschwärmen, lebt in großen Tiefen, gesellig",
      image: "/images/sharks/Seidenhai.jpg",
    },
    {
      name: "Engelhai",
      scientific_name: "Squatina squatina",
      average_length_m: 1.8,
      average_weight_kg: 35,
      lifespan_years: 35,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Sandige Meeresböden in gemäßigten Gewässern",
      nahrung: "Bodenfische, Krebstiere, Weichtiere",
      gefahr: "Gering - Beißt nur wenn gestört",
      gewohnheiten:
        "Tarnung im Sand, lauert auf Beute, nachtaktiv, flach wie ein Rochen, standorttreu",
      image: "/images/sharks/Engelhai.jpg",
    },
    {
      name: "Grauer Riffhai",
      scientific_name: "Carcharhinus amblyrhynchos",
      average_length_m: 1.9,
      average_weight_kg: 30,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Korallenriffe im Indo-Pazifik",
      nahrung: "Rifffische, Tintenfische, Krebstiere",
      gefahr: "Mittel - Territorial, zeigt Drohverhalten",
      gewohnheiten:
        "Sehr territorial, patroulliert Riffkanten, zeigt Drohgebärden, nachtaktiv, bildet Schulen",
      image: "/images/sharks/Grauer Riffhai.jpg",
    },
    {
      name: "Langflossen-Mako",
      scientific_name: "Isurus paucus",
      average_length_m: 3.7,
      average_weight_kg: 170,
      lifespan_years: 29,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id,
      geburtsort: "Tropische und subtropische Ozeane",
      nahrung: "Tintenfische, Fische, Delfine",
      gefahr: "Mittel - Seltener als Kurzflossen-Mako",
      gewohnheiten:
        "Tiefseehai, langsamer als Kurzflossen-Mako, seltener gesehen, große Brustflossen",
      image: "/images/sharks/Langflossen-Mako.jpg",
    },
    {
      name: "Sechskiemer-Hai",
      scientific_name: "Hexanchus griseus",
      average_length_m: 4.8,
      average_weight_kg: 590,
      lifespan_years: 80,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tiefsee weltweit, gemäßigte Gewässer",
      nahrung: "Fische, andere Haie, Robben, Aas",
      gefahr: "Gering - Lebt meist in großer Tiefe",
      gewohnheiten:
        "Primitiver Hai, sechs Kiemenspalten, nachtaktiv, steigt nachts auf, Tiefseeräuber",
      image: "/images/sharks/Sechskiemer-Hai.jpg",
    },
    {
      name: "Katzenhai",
      scientific_name: "Scyliorhinus canicula",
      average_length_m: 0.8,
      average_weight_kg: 2,
      lifespan_years: 12,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Küstengewässer und Kontinentalschelf weltweit",
      nahrung: "Kleine Fische, Würmer, Krebstiere",
      gefahr: "Keine - Völlig harmlos",
      gewohnheiten:
        "Nachtaktiv, versteckt sich tagsüber, lebt am Boden, klein und scheu, legt Eier",
      image: "/images/sharks/Katzenhai.jpg",
    },
    {
      name: "Hornhai",
      scientific_name: "Heterodontus francisci",
      average_length_m: 1.2,
      average_weight_kg: 10,
      lifespan_years: 25,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Pazifikküste Nordamerikas",
      nahrung: "Seeigel, Krebstiere, kleine Fische",
      gefahr: "Keine - Harmlos",
      gewohnheiten:
        "Nachtaktiv, versteckt sich in Felsspalten, langsam, kann an Land kriechen, legt spiralförmige Eier",
      image: "/images/sharks/Hornhai.jpg",
    },
    {
      name: "Galapagos-Hai",
      scientific_name: "Carcharhinus galapagensis",
      average_length_m: 3.0,
      average_weight_kg: 85,
      lifespan_years: 24,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Galapagos-Inseln und tropische Inseln",
      nahrung: "Fische, Tintenfische, Seelöwen",
      gefahr: "Mittel bis Hoch - Kann aggressiv sein",
      gewohnheiten:
        "Neugierig, oft bei Inseln, territorial, schwimmt in Gruppen, bevorzugt klares Wasser",
      image: "/images/sharks/Galapagos-Hai.jpeg",
    },
    {
      name: "Bronzehai",
      scientific_name: "Carcharhinus brachyurus",
      average_length_m: 3.0,
      average_weight_kg: 200,
      lifespan_years: 30,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Subtropische Küstengewässer weltweit",
      nahrung: "Fische, Rochen, Tintenfische",
      gefahr: "Mittel - Verwechslungen mit Bullenhai möglich",
      gewohnheiten:
        "Wandert saisonal, bildet große Schulen, springt bei Jagd aus Wasser, bevorzugt trübes Wasser",
      image: "/images/sharks/Bronzehai.jpg",
    },
    {
      name: "Blaugrauer Hai",
      scientific_name: "Carcharhinus plumbeus",
      average_length_m: 2.5,
      average_weight_kg: 120,
      lifespan_years: 35,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Gemäßigte und tropische Küstengewässer",
      nahrung: "Bodenfische, Rochen, Krebstiere",
      gefahr: "Sehr gering - Friedlich",
      gewohnheiten:
        "Lebt am Meeresboden, langsam, wandert in großen Gruppen, bevorzugt sandige Böden",
      image: "/images/sharks/Blaugrauer Hai.jpg",
    },
    {
      name: "Schwarzhai",
      scientific_name: "Dalatias licha",
      average_length_m: 3.6,
      average_weight_kg: 180,
      lifespan_years: 45,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Atlantik, Mittelmeer, Pazifik",
      nahrung: "Fische, Tintenfische, Krebstiere",
      gefahr: "Gering - Scheu vor Menschen",
      gewohnheiten:
        "Hochseehai, wandert große Distanzen, lebt in tiefen Gewässern, selten gesehen",
      image: "/images/sharks/Schwarzhai.jpg",
    },
    {
      name: "Nachthai",
      scientific_name: "Cephaloscyllium ventriosum",
      average_length_m: 2.8,
      average_weight_kg: 75,
      lifespan_years: 20,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tropische Korallenriffe, Indo-Pazifik",
      nahrung: "Krebstiere, Tintenfische, kleine Fische",
      gefahr: "Keine - Sehr klein und harmlos",
      gewohnheiten:
        "Nachtaktiv, ruht tagsüber in Spalten, sehr klein, gesellig, friedlich",
      image: "/images/sharks/Nachthai.jpg",
    },
    {
      name: "Weißspitzen-Hochseehai",
      scientific_name: "Carcharhinus longimanus",
      average_length_m: 3.0,
      average_weight_kg: 170,
      lifespan_years: 22,
      habitat_id: tropicalOcean.id,
      diet_id: opportunist.id,
      geburtsort: "Tropische und subtropische Ozeane",
      nahrung: "Fische, Tintenfische, Seevögel, Aas",
      gefahr: "Sehr hoch - Extrem gefährlich, besonders bei Schiffswracks",
      gewohnheiten:
        "Folgt Schiffen, oft bei Katastrophen beteiligt, sehr aggressiv, neugierig, langsam aber hartnäckig",
      image: "/images/sharks/Weißspitzen-Hochseehai.jpg",
    },
    {
      name: "Koboldhai",
      scientific_name: "Mitsukurina owstoni",
      average_length_m: 3.8,
      average_weight_kg: 210,
      lifespan_years: 60,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tiefsee weltweit",
      nahrung: "Tiefsee-Fische, Tintenfische, Krebstiere",
      gefahr: "Keine - Lebt in extremer Tiefe",
      gewohnheiten:
        "Sehr selten gesehen, ausfahrbarer Kiefer, lebt in 200-1300m Tiefe, pink gefärbt, langsam",
      image: "/images/sharks/Koboldhai.jpg",
    },
    {
      name: "Riesenmaul-Hai",
      scientific_name: "Megachasma pelagios",
      average_length_m: 5.5,
      average_weight_kg: 1200,
      lifespan_years: 100,
      habitat_id: deepOcean.id,
      diet_id: filterFeeder.id,
      geburtsort: "Tiefsee in tropischen Gewässern",
      nahrung: "Plankton, kleine Fische, Quallen",
      gefahr: "Keine - Filtrierer, sehr selten",
      gewohnheiten:
        "Sehr seltener Tiefseehai, riesiges Maul, filtert Plankton, leuchtendes Maul, steigt nachts auf",
      image: "/images/sharks/Riesenmaul-Hai.jpeg",
    },
    {
      name: "Dornhai",
      scientific_name: "Squalus acanthias",
      average_length_m: 1.2,
      average_weight_kg: 7,
      lifespan_years: 100,
      habitat_id: coldOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Gemäßigte und subarktische Gewässer weltweit",
      nahrung: "Kleine Fische, Tintenfische, Krebstiere",
      gefahr: "Sehr gering - Kleine Stacheln können stechen",
      gewohnheiten:
        "Giftige Rückenstacheln, lebt in großen Schwärmen, sehr langlebig (100+ Jahre), wichtiger Speisefisch",
      image: "/images/sharks/Dornhai.jpg",
    },
    {
      name: "Pazifischer Schlafhai",
      scientific_name: "Somniosus pacificus",
      average_length_m: 4.3,
      average_weight_kg: 350,
      lifespan_years: 200,
      habitat_id: coldOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Nordpazifik, kalte Gewässer",
      nahrung: "Fische, Tintenfische, Aas",
      gefahr: "Sehr gering - Träge und langsam",
      gewohnheiten:
        "Extrem langsam, kann 200+ Jahre alt werden, lebt in Tiefsee, träge, bevorzugt kaltes Wasser",
      image: "/images/sharks/Pazifischer Schlafhai.jpg",
    },
    {
      name: "Laternhai",
      scientific_name: "Etmopterus spinax",
      average_length_m: 0.5,
      average_weight_kg: 0.5,
      lifespan_years: 20,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tiefsee weltweit",
      nahrung: "Winzige Fische, Krebstiere, Tintenfische",
      gefahr: "Keine - Winzig klein",
      gewohnheiten:
        "Biolumineszent (leuchtet), kleinster Hai, lebt in extremer Tiefe, nutzt Licht zur Tarnung",
      image: "/images/sharks/Laternhai.jpeg",
    },
    {
      name: "Zittern-Hai",
      scientific_name: "Galeorhinus galeus",
      average_length_m: 2.1,
      average_weight_kg: 45,
      lifespan_years: 18,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Küstengewässer Atlantik und Mittelmeer",
      nahrung: "Fische, Krebstiere, Tintenfische",
      gefahr: "Gering - Normalerweise scheu",
      gewohnheiten:
        "Wandert saisonal, lebt in mittleren Tiefen, gesellig, aktiver Jäger",
      image: "/images/sharks/Zittern-Hai.jpg",
    },
    {
      name: "Karibischer Riffhai",
      scientific_name: "Carcharhinus perezi",
      average_length_m: 2.5,
      average_weight_kg: 70,
      lifespan_years: 22,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Karibisches Meer, Korallenriffe",
      nahrung: "Rifffische, Tintenfische, Rochen",
      gefahr: "Mittel - Kann territorial sein",
      gewohnheiten:
        "Bevorzugt Korallenriffe, territorial, ruht tagsüber, jagt nachts, standorttreu",
      image: "/images/sharks/Karibischer Riffhai.jpg",
    },
    {
      name: "Australischer Schwarzspitzenhai",
      scientific_name: "Carcharhinus tilstoni",
      average_length_m: 1.8,
      average_weight_kg: 35,
      lifespan_years: 15,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Küstengewässer Nordaustralien, Indo-Pazifik",
      nahrung: "Kleine Fische, Krebstiere",
      gefahr: "Sehr gering - Klein und scheu",
      gewohnheiten:
        "Lebt in flachem Wasser, sehr aktiv, springt aus Wasser, gesellig, bevorzugt Mangrovenwälder",
      image: "/images/sharks/Australischer Schwarzspitzenhai.jpg",
    },
    {
      name: "Spinner-Hai",
      scientific_name: "Carcharhinus brevipinna",
      average_length_m: 2.4,
      average_weight_kg: 90,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tropische und subtropische Küsten weltweit",
      nahrung: "Kleine Fische, Tintenfische",
      gefahr: "Sehr gering - Scheu vor Menschen",
      gewohnheiten:
        "Spektakuläre Sprünge mit Drehungen, jagt in Schulen, schneller Schwimmer, wandert saisonal",
      image: "/images/sharks/Spinner-Hai.jpeg",
    },
    {
      name: "Atlantischer Scherbenhai",
      scientific_name: "Centroscymnus coelolepis",
      average_length_m: 1.5,
      average_weight_kg: 20,
      lifespan_years: 18,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Atlantik, Mittelmeer",
      nahrung: "Kleine Fische, Tintenfische, Krebstiere",
      gefahr: "Keine - Klein und harmlos",
      gewohnheiten:
        "Lebt in mittleren Tiefen, nachtaktiv, selten gesehen, gesellig",
      image: "/images/sharks/Atlantischer Scherbenhai.jpeg",
    },
    {
      name: "Borneo-Hai",
      scientific_name: "Glyphis sp.",
      average_length_m: 0.7,
      average_weight_kg: 3,
      lifespan_years: 10,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Borneo, Südostasien (Süßwasser)",
      nahrung: "Kleine Fische, Krebstiere",
      gefahr: "Keine - Extrem selten und klein",
      gewohnheiten:
        "Lebt in Flüssen, extrem selten (nur wenige Exemplare bekannt), klein, nachtaktiv",
      image: "/images/sharks/Borneo-Hai.jpeg",
    },
    {
      name: "Fleckhai",
      scientific_name: "Chiloscyllium punctatum",
      average_length_m: 1.6,
      average_weight_kg: 20,
      lifespan_years: 13,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Korallenriffe Indo-Pazifik",
      nahrung: "Kleine Fische, Krebstiere, Würmer",
      gefahr: "Keine - Friedlich und klein",
      gewohnheiten:
        "Nachtaktiv, versteckt sich tagsüber, hübsche Fleckenmusterung, lebt am Boden",
      image: "/images/sharks/Fleckhai.jpg",
    },
    {
      name: "Pazifischer Engelhai",
      scientific_name: "Squatina californica",
      average_length_m: 1.5,
      average_weight_kg: 27,
      lifespan_years: 35,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Pazifikküste, sandige Böden",
      nahrung: "Bodenfische, Tintenfische, Krebstiere",
      gefahr: "Gering - Beißt nur wenn gestört",
      gewohnheiten:
        "Vergräbt sich im Sand, lauert auf Beute, flach wie Rochen, blitzschneller Angriff",
      image: "/images/sharks/Pazifischer Engelhai.jpg",
    },
    {
      name: "Japanischer Teppichhai",
      scientific_name: "Orectolobus japonicus",
      average_length_m: 1.0,
      average_weight_kg: 15,
      lifespan_years: 25,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Japanische Küsten, felsige Böden",
      nahrung: "Kleine Fische, Krebstiere, Tintenfische",
      gefahr: "Gering - Kann beißen wenn gestört",
      gewohnheiten:
        "Perfekte Tarnung, lauert bewegungslos, saugt Beute ein, nachtaktiv",
      image: "/images/sharks/Japanischer Teppichhai.jpeg",
    },
    {
      name: "Zebrahai",
      scientific_name: "Stegostoma fasciatum",
      average_length_m: 2.5,
      average_weight_kg: 30,
      lifespan_years: 28,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Indo-Pazifik, Korallenriffe",
      nahrung: "Weichtiere, Krebstiere, kleine Fische",
      gefahr: "Keine - Sehr friedlich",
      gewohnheiten:
        "Wunderschöne Musterung, sehr friedlich, liegt oft am Boden, nachtaktiv, beliebt bei Tauchern",
      image: "/images/sharks/Zebrahai.jpg",
    },
    {
      name: "Ammenhai",
      scientific_name: "Ginglymostoma cirratum",
      average_length_m: 2.7,
      average_weight_kg: 110,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tropische Küsten, Karibik, Atlantik",
      nahrung: "Krebstiere, Tintenfische, Fische",
      gefahr: "Sehr gering - Friedlich, beißt nur wenn belästigt",
      gewohnheiten:
        "Ruht tagsüber in Gruppen, saugt Beute vom Boden, sehr friedlich, nachtaktiv",
      image: "/images/sharks/Ammenhai.jpg",
    },
    {
      name: "Bambushai",
      scientific_name: "Chiloscyllium plagiosum",
      average_length_m: 1.0,
      average_weight_kg: 10,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Indo-Pazifik, Korallenriffe",
      nahrung: "Kleine Fische, Krebstiere, Würmer",
      gefahr: "Keine - Völlig harmlos",
      gewohnheiten:
        "Sehr klein, schlank, nachtaktiv, versteckt sich in Spalten, kann an Land überleben",
      image: "/images/sharks/Bambushai.jpeg",
    },
    {
      name: "Kragenhai",
      scientific_name: "Chlamydoselachus anguineus",
      average_length_m: 2.0,
      average_weight_kg: 50,
      lifespan_years: 25,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Tiefsee weltweit",
      nahrung: "Tintenfische, Fische",
      gefahr: "Keine - Lebt in extremer Tiefe",
      gewohnheiten:
        "Lebender Fossil (300 Mio Jahre alt), aalähnlicher Körper, sehr selten gesehen, bizarre Form",
      image: "/images/sharks/Kragenhai.jpeg",
    },
    {
      name: "Megamaul-Hai",
      scientific_name: "Megachasma pelagios",
      average_length_m: 1.2,
      average_weight_kg: 8,
      lifespan_years: 15,
      habitat_id: deepOcean.id,
      diet_id: filterFeeder.id,
      geburtsort: "Verschiedene Tiefsee-Regionen",
      nahrung: "Plankton, Quallen, kleine Fische",
      gefahr: "Keine - Filtrierer",
      gewohnheiten:
        "Erst 1976 entdeckt, sehr selten, riesiges Maul, filtert Plankton, lebt in Tiefsee",
      image: "/images/sharks/Megamaul-Hai.jpeg",
    },
    {
      name: "Grönland-Eishai",
      scientific_name: "Somniosus microcephalus",
      average_length_m: 6.4,
      average_weight_kg: 1400,
      lifespan_years: 500,
      habitat_id: coldOcean.id,
      diet_id: carnivore.id,
      geburtsort: "Arktis, Nordatlantik (extrem kalte Gewässer)",
      nahrung: "Fische, Robben, Rentiere, Aas",
      gefahr: "Sehr gering - Extrem langsam, lebt in Tiefe",
      gewohnheiten:
        "Ältestes Wirbeltier (500+ Jahre), extrem langsam, giftiges Fleisch, lebt in eiskaltem Wasser, fast blind",
      image: "/images/sharks/Grönland-Eishai.jpeg",
    },
  ];

  console.log("📝 Erstelle Haie mit detaillierten Informationen...");

  for (const sharkData of sharksData) {
    await prisma.shark.create({
      data: sharkData,
    });
  }

  console.log(
    `✅ ${sharksData.length} Haie mit vollständigen Informationen erstellt`
  );

  // Erstelle Beobachtungen (optional)
  console.log("📍 Erstelle Beobachtungen...");

  const allSharks = await prisma.shark.findMany();

  await prisma.observation.create({
    data: {
      shark_id: allSharks[0].id, // Weißer Hai
      location: "Südafrika, False Bay",
      date_observed: new Date("2024-06-15"),
      length_m: 4.8,
      weight_kg: 1100,
      notes: "Großes Exemplar beim Robbenjagen beobachtet",
    },
  });

  await prisma.observation.create({
    data: {
      shark_id: allSharks[3].id, // Walhai
      location: "Malediven",
      date_observed: new Date("2024-07-20"),
      length_m: 11.5,
      weight_kg: 17500,
      notes: "Friedlich an der Oberfläche beim Planktonfressen",
    },
  });

  console.log("✅ Beobachtungen erstellt");
  console.log("🎉 Seeding erfolgreich abgeschlossen!");
}

main()
  .catch((e) => {
    console.error("❌ Fehler beim Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
