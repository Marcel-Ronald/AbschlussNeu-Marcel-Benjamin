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
      depth_range_m: "0-200m"
    }
  });

  const temperateOcean = await prisma.habitat.create({
    data: {
      region: "Gemäßigte Meere",
      temperature_range: "10-20°C",
      depth_range_m: "0-300m"
    }
  });

  const coldOcean = await prisma.habitat.create({
    data: {
      region: "Kalte Gewässer",
      temperature_range: "0-10°C",
      depth_range_m: "0-2000m"
    }
  });

  const deepOcean = await prisma.habitat.create({
    data: {
      region: "Tiefsee",
      temperature_range: "2-8°C",
      depth_range_m: "200-1000m"
    }
  });

  const coastalWaters = await prisma.habitat.create({
    data: {
      region: "Küstengewässer",
      temperature_range: "15-25°C",
      depth_range_m: "0-100m"
    }
  });

  const arcticOcean = await prisma.habitat.create({
    data: {
      region: "Arktische Gewässer",
      temperature_range: "-2-5°C",
      depth_range_m: "0-500m"
    }
  });

  const openOcean = await prisma.habitat.create({
    data: {
      region: "Offenes Meer",
      temperature_range: "10-25°C",
      depth_range_m: "0-500m"
    }
  });

  console.log("✅ Habitate erstellt");

  // Erstelle Diäten
  const carnivore = await prisma.diet.create({
    data: {
      diet_type: "Fleischfresser",
      prey_example: "Robben, Fische, Meeresschildkröten"
    }
  });

  const filterFeeder = await prisma.diet.create({
    data: {
      diet_type: "Filtrierer",
      prey_example: "Plankton, Krill, kleine Fische"
    }
  });

  const opportunist = await prisma.diet.create({
    data: {
      diet_type: "Opportunist",
      prey_example: "Fische, Krustentiere, Aas, Müll"
    }
  });

  const fishEater = await prisma.diet.create({
    data: {
      diet_type: "Fischfresser",
      prey_example: "Thunfisch, Makrele, andere Fische"
    }
  });

  const bottomFeeder = await prisma.diet.create({
    data: {
      diet_type: "Bodenfresser",
      prey_example: "Muscheln, Krabben, Weichtiere"
    }
  });

  const mixedDiet = await prisma.diet.create({
    data: {
      diet_type: "Gemischte Ernährung",
      prey_example: "Fische, Tintenfische, Krustentiere"
    }
  });

  console.log("✅ Diäten erstellt");

  // Erstelle Haie
  const sharks = [
    {
      name: "Weißer Hai",
      scientific_name: "Carcharodon carcharias",
      average_length_m: 4.5,
      average_weight_kg: 1000,
      lifespan_years: 70,
      habitat_id: temperateOcean.id,
      diet_id: carnivore.id
    },
    {
      name: "Hammerhai",
      scientific_name: "Sphyrna mokarran",
      average_length_m: 4.0,
      average_weight_kg: 450,
      lifespan_years: 30,
      habitat_id: tropicalOcean.id,
      diet_id: carnivore.id
    },
    {
      name: "Tigerhai",
      scientific_name: "Galeocerdo cuvier",
      average_length_m: 3.8,
      average_weight_kg: 600,
      lifespan_years: 50,
      habitat_id: tropicalOcean.id,
      diet_id: opportunist.id
    },
    {
      name: "Walhai",
      scientific_name: "Rhincodon typus",
      average_length_m: 12.0,
      average_weight_kg: 18000,
      lifespan_years: 100,
      habitat_id: tropicalOcean.id,
      diet_id: filterFeeder.id
    },
    {
      name: "Blauhai",
      scientific_name: "Prionace glauca",
      average_length_m: 3.0,
      average_weight_kg: 200,
      lifespan_years: 20,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Grönlandhai",
      scientific_name: "Somniosus microcephalus",
      average_length_m: 5.0,
      average_weight_kg: 1000,
      lifespan_years: 400,
      habitat_id: coldOcean.id,
      diet_id: carnivore.id
    },
    {
      name: "Weißspitzen-Riffhai",
      scientific_name: "Triaenodon obesus",
      average_length_m: 1.6,
      average_weight_kg: 18,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Kurzflossen-Mako",
      scientific_name: "Isurus oxyrinchus",
      average_length_m: 3.2,
      average_weight_kg: 300,
      lifespan_years: 32,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Bullenhai",
      scientific_name: "Carcharhinus leucas",
      average_length_m: 2.5,
      average_weight_kg: 230,
      lifespan_years: 30,
      habitat_id: tropicalOcean.id,
      diet_id: opportunist.id
    },
    {
      name: "Zitronenhai",
      scientific_name: "Negaprion brevirostris",
      average_length_m: 3.0,
      average_weight_kg: 180,
      lifespan_years: 27,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Riesenhai",
      scientific_name: "Cetorhinus maximus",
      average_length_m: 8.5,
      average_weight_kg: 4000,
      lifespan_years: 50,
      habitat_id: temperateOcean.id,
      diet_id: filterFeeder.id
    },
    {
      name: "Schwarzspitzen-Riffhai",
      scientific_name: "Carcharhinus melanopterus",
      average_length_m: 1.6,
      average_weight_kg: 20,
      lifespan_years: 12,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Sandtigerhai",
      scientific_name: "Carcharias taurus",
      average_length_m: 3.2,
      average_weight_kg: 160,
      lifespan_years: 35,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Fuchshai",
      scientific_name: "Alopias vulpinus",
      average_length_m: 4.5,
      average_weight_kg: 350,
      lifespan_years: 22,
      habitat_id: openOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Seidenhai",
      scientific_name: "Carcharhinus falciformis",
      average_length_m: 2.5,
      average_weight_kg: 85,
      lifespan_years: 22,
      habitat_id: openOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Engelhai",
      scientific_name: "Squatina squatina",
      average_length_m: 1.8,
      average_weight_kg: 35,
      lifespan_years: 25,
      habitat_id: coastalWaters.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Grauer Riffhai",
      scientific_name: "Carcharhinus amblyrhynchos",
      average_length_m: 1.9,
      average_weight_kg: 30,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Langflossen-Mako",
      scientific_name: "Isurus paucus",
      average_length_m: 3.7,
      average_weight_kg: 170,
      lifespan_years: 30,
      habitat_id: openOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Sechskiemer-Hai",
      scientific_name: "Hexanchus griseus",
      average_length_m: 4.8,
      average_weight_kg: 590,
      lifespan_years: 80,
      habitat_id: deepOcean.id,
      diet_id: carnivore.id
    },
    {
      name: "Katzenhai",
      scientific_name: "Scyliorhinus canicula",
      average_length_m: 0.8,
      average_weight_kg: 2,
      lifespan_years: 12,
      habitat_id: coastalWaters.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Hornhai",
      scientific_name: "Heterodontus francisci",
      average_length_m: 1.2,
      average_weight_kg: 10,
      lifespan_years: 25,
      habitat_id: coastalWaters.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Galapagos-Hai",
      scientific_name: "Carcharhinus galapagensis",
      average_length_m: 3.0,
      average_weight_kg: 85,
      lifespan_years: 24,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Bronzehai",
      scientific_name: "Carcharhinus brachyurus",
      average_length_m: 3.0,
      average_weight_kg: 200,
      lifespan_years: 30,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Blaugrauer Hai",
      scientific_name: "Carcharhinus plumbeus",
      average_length_m: 2.5,
      average_weight_kg: 120,
      lifespan_years: 35,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Schwarzhai",
      scientific_name: "Carcharhinus obscurus",
      average_length_m: 3.6,
      average_weight_kg: 180,
      lifespan_years: 45,
      habitat_id: openOcean.id,
      diet_id: carnivore.id
    },
    {
      name: "Nachthai",
      scientific_name: "Carcharhinus signatus",
      average_length_m: 2.8,
      average_weight_kg: 75,
      lifespan_years: 20,
      habitat_id: deepOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Weiße Spitze Hochseehai",
      scientific_name: "Carcharhinus longimanus",
      average_length_m: 3.0,
      average_weight_kg: 170,
      lifespan_years: 22,
      habitat_id: openOcean.id,
      diet_id: opportunist.id
    },
    {
      name: "Koboldhai",
      scientific_name: "Mitsukurina owstoni",
      average_length_m: 3.8,
      average_weight_kg: 210,
      lifespan_years: 60,
      habitat_id: deepOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Riesenmaul-Hai",
      scientific_name: "Megachasma pelagios",
      average_length_m: 5.5,
      average_weight_kg: 1200,
      lifespan_years: 100,
      habitat_id: deepOcean.id,
      diet_id: filterFeeder.id
    },
    {
      name: "Dornhai",
      scientific_name: "Squalus acanthias",
      average_length_m: 1.2,
      average_weight_kg: 7,
      lifespan_years: 100,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Pazifischer Schlafhai",
      scientific_name: "Somniosus pacificus",
      average_length_m: 4.3,
      average_weight_kg: 350,
      lifespan_years: 200,
      habitat_id: coldOcean.id,
      diet_id: carnivore.id
    },
    {
      name: "Laternhai",
      scientific_name: "Etmopterus spinax",
      average_length_m: 0.5,
      average_weight_kg: 0.5,
      lifespan_years: 20,
      habitat_id: deepOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Zittern-Hai",
      scientific_name: "Carcharias tricuspidatus",
      average_length_m: 2.1,
      average_weight_kg: 45,
      lifespan_years: 18,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Karibischer Riffhai",
      scientific_name: "Carcharhinus perezi",
      average_length_m: 2.5,
      average_weight_kg: 70,
      lifespan_years: 22,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Australischer Schwarzspitzenhai",
      scientific_name: "Carcharhinus tilstoni",
      average_length_m: 1.8,
      average_weight_kg: 35,
      lifespan_years: 15,
      habitat_id: tropicalOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Spinner-Hai",
      scientific_name: "Carcharhinus brevipinna",
      average_length_m: 2.4,
      average_weight_kg: 90,
      lifespan_years: 25,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Atlantischer Scherbenhai",
      scientific_name: "Carcharhinus acronotus",
      average_length_m: 1.5,
      average_weight_kg: 20,
      lifespan_years: 18,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Borneo-Hai",
      scientific_name: "Carcharhinus borneensis",
      average_length_m: 0.7,
      average_weight_kg: 3,
      lifespan_years: 10,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Fleckhai",
      scientific_name: "Carcharhinus sorrah",
      average_length_m: 1.6,
      average_weight_kg: 20,
      lifespan_years: 13,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Pazifischer Engelhai",
      scientific_name: "Squatina californica",
      average_length_m: 1.5,
      average_weight_kg: 27,
      lifespan_years: 35,
      habitat_id: temperateOcean.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Japanischer Teppichhai",
      scientific_name: "Orectolobus japonicus",
      average_length_m: 1.0,
      average_weight_kg: 15,
      lifespan_years: 25,
      habitat_id: coastalWaters.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Zebrahai",
      scientific_name: "Stegostoma fasciatum",
      average_length_m: 2.5,
      average_weight_kg: 30,
      lifespan_years: 28,
      habitat_id: tropicalOcean.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Ammenhai",
      scientific_name: "Ginglymostoma cirratum",
      average_length_m: 2.7,
      average_weight_kg: 110,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Bambushai",
      scientific_name: "Chiloscyllium punctatum",
      average_length_m: 1.0,
      average_weight_kg: 10,
      lifespan_years: 25,
      habitat_id: tropicalOcean.id,
      diet_id: bottomFeeder.id
    },
    {
      name: "Sägerochen",
      scientific_name: "Pristis pectinata",
      average_length_m: 5.5,
      average_weight_kg: 350,
      lifespan_years: 30,
      habitat_id: coastalWaters.id,
      diet_id: fishEater.id
    },
    {
      name: "Kragenhai",
      scientific_name: "Chlamydoselachus anguineus",
      average_length_m: 2.0,
      average_weight_kg: 50,
      lifespan_years: 25,
      habitat_id: deepOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Megamaul-Hai",
      scientific_name: "Pseudocarcharias kamoharai",
      average_length_m: 1.2,
      average_weight_kg: 8,
      lifespan_years: 15,
      habitat_id: deepOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Atlantischer Zitterrochen",
      scientific_name: "Torpedo nobiliana",
      average_length_m: 1.8,
      average_weight_kg: 90,
      lifespan_years: 32,
      habitat_id: temperateOcean.id,
      diet_id: fishEater.id
    },
    {
      name: "Grönland-Eishai",
      scientific_name: "Somniosus microcephalus",
      average_length_m: 6.4,
      average_weight_kg: 1400,
      lifespan_years: 500,
      habitat_id: arcticOcean.id,
      diet_id: carnivore.id
    }
  ];

  const createdSharks = [];
  for (const sharkData of sharks) {
    const shark = await prisma.shark.create({
      data: sharkData
    });
    createdSharks.push(shark);
    console.log(`✅ ${sharkData.name} hinzugefügt`);
  }

  console.log("✅ Alle Haie erstellt");

  // Erstelle Observations (Beobachtungen)
  const observations = [
    {
      shark_id: createdSharks[0].id, // Weißer Hai
      location: "Südafrika, Gansbaai",
      date_observed: new Date("2024-03-15"),
      length_m: 4.8,
      weight_kg: 1100,
      notes: "Großes Weibchen, sehr aktiv bei der Robbenjagd. Mehrfache Angriffe auf Köder beobachtet."
    },
    {
      shark_id: createdSharks[0].id, // Weißer Hai
      location: "Kalifornien, Farallon Islands",
      date_observed: new Date("2024-06-22"),
      length_m: 4.2,
      weight_kg: 950,
      notes: "Männchen mit Narben an der Rückenflosse. Jagdverhalten dokumentiert."
    },
    {
      shark_id: createdSharks[1].id, // Hammerhai
      location: "Hawaii, Kona Coast",
      date_observed: new Date("2024-05-10"),
      length_m: 3.9,
      weight_kg: 430,
      notes: "In einer Gruppe von 5 Hammerhaien gesichtet. Schwimmt in Küstennähe."
    },
    {
      shark_id: createdSharks[1].id, // Hammerhai
      location: "Galapagos-Inseln",
      date_observed: new Date("2024-07-18"),
      length_m: 4.3,
      weight_kg: 480,
      notes: "Sehr großes Exemplar, Teil einer Schule von über 20 Individuen."
    },
    {
      shark_id: createdSharks[2].id, // Tigerhai
      location: "Australien, Great Barrier Reef",
      date_observed: new Date("2024-04-05"),
      length_m: 3.5,
      weight_kg: 550,
      notes: "Junges Weibchen mit typischen Tigerstreifen. Gefunden mit Plastik im Magen."
    },
    {
      shark_id: createdSharks[2].id, // Tigerhai
      location: "Florida, Miami Beach",
      date_observed: new Date("2024-08-30"),
      length_m: 4.1,
      weight_kg: 650,
      notes: "Männchen in flachem Wasser, nur 2m Tiefe. Sehr neugierig gegenüber Tauchern."
    },
    {
      shark_id: createdSharks[3].id, // Walhai
      location: "Philippinen, Oslob",
      date_observed: new Date("2024-02-14"),
      length_m: 11.5,
      weight_kg: 17500,
      notes: "Riesiges Weibchen, friedlich beim Planktonfressen. Taucher schwammen daneben."
    },
    {
      shark_id: createdSharks[3].id, // Walhai
      location: "Mexiko, Isla Mujeres",
      date_observed: new Date("2024-09-08"),
      length_m: 9.8,
      weight_kg: 15000,
      notes: "Jungtier, sehr verspielt. Näherte sich mehrfach dem Boot."
    },
    {
      shark_id: createdSharks[4].id, // Blauhai
      location: "Portugal, Azoren",
      date_observed: new Date("2024-06-12"),
      length_m: 2.8,
      weight_kg: 190,
      notes: "Schlankes Weibchen mit leuchtend blauer Färbung. Jagte Makrelenschwarm."
    },
    {
      shark_id: createdSharks[4].id, // Blauhai
      location: "Mittelmeer, Mallorca",
      date_observed: new Date("2024-07-25"),
      length_m: 3.2,
      weight_kg: 215,
      notes: "Männchen mit mehreren Remoras (Schiffshalter) am Körper."
    },
    {
      shark_id: createdSharks[5].id, // Grönlandhai
      location: "Grönland, Disko Bay",
      date_observed: new Date("2024-01-20"),
      length_m: 4.8,
      weight_kg: 980,
      notes: "Sehr altes Exemplar, geschätztes Alter über 300 Jahre. Langsame Bewegungen."
    },
    {
      shark_id: createdSharks[5].id, // Grönlandhai
      location: "Island, Nordküste",
      date_observed: new Date("2024-03-08"),
      length_m: 5.3,
      weight_kg: 1100,
      notes: "Extrem großes Weibchen. Schwamm in 800m Tiefe, aufgenommen mit ROV."
    },
    {
      shark_id: createdSharks[6].id, // Weißspitzen-Riffhai
      location: "Malediven, Ari Atoll",
      date_observed: new Date("2024-05-17"),
      length_m: 1.5,
      weight_kg: 16,
      notes: "In einer Höhle ruhend während des Tages. Typisches Verhalten."
    },
    {
      shark_id: createdSharks[6].id, // Weißspitzen-Riffhai
      location: "Thailand, Similan Islands",
      date_observed: new Date("2024-11-02"),
      length_m: 1.7,
      weight_kg: 19,
      notes: "Nachttauchgang: Aktiv auf der Jagd nach kleinen Fischen im Riff."
    },
    {
      shark_id: createdSharks[7].id, // Kurzflossen-Mako
      location: "Neuseeland, Bay of Plenty",
      date_observed: new Date("2024-04-28"),
      length_m: 3.0,
      weight_kg: 280,
      notes: "Extrem schnell, sprang mehrfach aus dem Wasser. Beeindruckende Akrobatik."
    },
    {
      shark_id: createdSharks[7].id, // Kurzflossen-Mako
      location: "Südafrika, Cape Point",
      date_observed: new Date("2024-10-15"),
      length_m: 3.4,
      weight_kg: 320,
      notes: "Männchen, jagte Thunfischschwarm. Geschwindigkeit geschätzt über 60 km/h."
    },
    {
      shark_id: createdSharks[8].id, // Bullenhai
      location: "Südafrika, Umhlanga",
      date_observed: new Date("2024-05-03"),
      length_m: 2.3,
      weight_kg: 210,
      notes: "In Flussmündung gesichtet, Süßwasser-Toleranz bestätigt."
    },
    {
      shark_id: createdSharks[8].id, // Bullenhai
      location: "Nicaragua, Lake Nicaragua",
      date_observed: new Date("2024-08-19"),
      length_m: 2.7,
      weight_kg: 250,
      notes: "Komplett in Süßwasser lebend. Aggressives Verhalten gegenüber Fischern."
    },
    {
      shark_id: createdSharks[9].id, // Zitronenhai
      location: "Bahamas, Bimini",
      date_observed: new Date("2024-03-25"),
      length_m: 2.8,
      weight_kg: 170,
      notes: "Jungtier in flacher Mangrovenbucht. Teil einer Forschungsstudie mit Tag."
    },
    {
      shark_id: createdSharks[9].id, // Zitronenhai
      location: "Florida Keys, Islamorada",
      date_observed: new Date("2024-09-14"),
      length_m: 3.1,
      weight_kg: 195,
      notes: "Weibchen, schwanger. Schwamm sehr langsam in geschützter Bucht."
    },
    {
      shark_id: createdSharks[10].id, // Riesenhai
      location: "Schottland, Isle of Man",
      date_observed: new Date("2024-06-05"),
      length_m: 8.2,
      weight_kg: 3800,
      notes: "Riesiger Filtrierer, Maul weit geöffnet beim Planktonfressen."
    },
    {
      shark_id: createdSharks[11].id, // Schwarzspitzen-Riffhai
      location: "Seychellen, Aldabra",
      date_observed: new Date("2024-07-12"),
      length_m: 1.5,
      weight_kg: 18,
      notes: "Jungtier in flachem Wasser, typische schwarze Flossenspitzen."
    },
    {
      shark_id: createdSharks[12].id, // Sandtigerhai
      location: "North Carolina, Outer Banks",
      date_observed: new Date("2024-08-20"),
      length_m: 3.0,
      weight_kg: 155,
      notes: "Beeindruckende Zähne sichtbar, schwimmt langsam im Wrack."
    },
    {
      shark_id: createdSharks[13].id, // Fuchshai
      location: "Kalifornien, Channel Islands",
      date_observed: new Date("2024-05-28"),
      length_m: 4.3,
      weight_kg: 340,
      notes: "Nutzte langen Schwanz zum Betäuben von Fischen. Spektakulär!"
    },
    {
      shark_id: createdSharks[14].id, // Seidenhai
      location: "Kuba, Jardines de la Reina",
      date_observed: new Date("2024-04-15"),
      length_m: 2.4,
      weight_kg: 80,
      notes: "Elegante Bewegungen, seidige Haut. Sehr neugierig."
    },
    {
      shark_id: createdSharks[15].id, // Engelhai
      location: "Kanaren, Teneriffa",
      date_observed: new Date("2024-09-03"),
      length_m: 1.7,
      weight_kg: 33,
      notes: "Perfekt getarnt auf Sandboden, Lauerjäger."
    },
    {
      shark_id: createdSharks[16].id, // Grauer Riffhai
      location: "Malediven, Male Atoll",
      date_observed: new Date("2024-06-18"),
      length_m: 1.8,
      weight_kg: 28,
      notes: "Territorial aggressiv, warnendes Schwimmverhalten beobachtet."
    },
    {
      shark_id: createdSharks[17].id, // Langflossen-Mako
      location: "Hawaii, Oahu",
      date_observed: new Date("2024-07-30"),
      length_m: 3.5,
      weight_kg: 165,
      notes: "Lange Brustflossen charakteristisch, schneller Schwimmer."
    },
    {
      shark_id: createdSharks[18].id, // Sechskiemer-Hai
      location: "Kanada, British Columbia",
      date_observed: new Date("2024-05-11"),
      length_m: 4.6,
      weight_kg: 570,
      notes: "Tiefseehai in 600m Tiefe mit ROV gefilmt. 6 Kiemenschlitze deutlich sichtbar."
    },
    {
      shark_id: createdSharks[19].id, // Katzenhai
      location: "Nordsee, Helgoland",
      date_observed: new Date("2024-08-08"),
      length_m: 0.7,
      weight_kg: 1.8,
      notes: "Kleiner nachtaktiver Hai, in Felsspalte versteckt."
    },
    {
      shark_id: createdSharks[20].id, // Hornhai
      location: "Kalifornien, La Jolla",
      date_observed: new Date("2024-03-22"),
      length_m: 1.1,
      weight_kg: 9,
      notes: "Charakteristische Hornstacheln vor Rückenflossen."
    },
    {
      shark_id: createdSharks[21].id, // Galapagos-Hai
      location: "Galapagos, Darwin Island",
      date_observed: new Date("2024-10-05"),
      length_m: 2.9,
      weight_kg: 82,
      notes: "In großer Schule jagend, sehr koordiniert."
    },
    {
      shark_id: createdSharks[22].id, // Bronzehai
      location: "Südafrika, Eastern Cape",
      date_observed: new Date("2024-11-11"),
      length_m: 2.8,
      weight_kg: 190,
      notes: "Teil der Sardine Run Migration, aggressives Fressverhalten."
    },
    {
      shark_id: createdSharks[23].id, // Blaugrauer Hai
      location: "Delaware Bay, USA",
      date_observed: new Date("2024-06-25"),
      length_m: 2.4,
      weight_kg: 115,
      notes: "Weibchen in Geburtsgewässern, mehrere Jungtiere in Nähe."
    },
    {
      shark_id: createdSharks[24].id, // Schwarzhai
      location: "Atlantik, Azoren",
      date_observed: new Date("2024-07-07"),
      length_m: 3.4,
      weight_kg: 175,
      notes: "Dunkle Färbung, schwer zu fotografieren. Scheuer Charakter."
    },
    {
      shark_id: createdSharks[25].id, // Nachthai
      location: "Golf von Mexiko",
      date_observed: new Date("2024-09-19"),
      length_m: 2.7,
      weight_kg: 72,
      notes: "Aufstieg aus Tiefsee bei Nacht zur Jagd beobachtet."
    },
    {
      shark_id: createdSharks[26].id, // Weiße Spitze Hochseehai
      location: "Ägypten, Rotes Meer",
      date_observed: new Date("2024-04-28"),
      length_m: 2.9,
      weight_kg: 165,
      notes: "Sehr neugierig, umkreiste Boot mehrfach. Weiße Flossenspitzen leuchtend."
    },
    {
      shark_id: createdSharks[27].id, // Koboldhai
      location: "Japan, Suruga Bay",
      date_observed: new Date("2024-01-30"),
      length_m: 3.6,
      weight_kg: 205,
      notes: "Seltene Sichtung! Ausfahrbare Kiefer dokumentiert. Tiefsee 800m."
    },
    {
      shark_id: createdSharks[28].id, // Riesenmaul-Hai
      location: "Philippinen, Luzon",
      date_observed: new Date("2024-03-12"),
      length_m: 5.3,
      weight_kg: 1150,
      notes: "Extrem seltener Fund, riesiges Maul beim Filtrieren. Nur 100 Sichtungen weltweit!"
    },
    {
      shark_id: createdSharks[29].id, // Dornhai
      location: "Norwegen, Oslofjord",
      date_observed: new Date("2024-10-22"),
      length_m: 1.1,
      weight_kg: 6.5,
      notes: "Giftige Rückenflossenstacheln, langsamer Schwimmer."
    },
    {
      shark_id: createdSharks[30].id, // Pazifischer Schlafhai
      location: "Alaska, Aleuten",
      date_observed: new Date("2024-02-14"),
      length_m: 4.1,
      weight_kg: 340,
      notes: "Sehr alt geschätzt (150+ Jahre), langsame Bewegungen."
    },
    {
      shark_id: createdSharks[31].id, // Laternhai
      location: "Atlantik, Tiefsee",
      date_observed: new Date("2024-05-17"),
      length_m: 0.4,
      weight_kg: 0.4,
      notes: "Biolumineszent! Leuchtorgane an Bauch sichtbar. Miniaturhai."
    },
    {
      shark_id: createdSharks[32].id, // Zittern-Hai
      location: "Japan, Küstengewässer",
      date_observed: new Date("2024-07-21"),
      length_m: 2.0,
      weight_kg: 43,
      notes: "Zitternde Schwanzflossenbewegung beobachtet."
    },
    {
      shark_id: createdSharks[33].id, // Karibischer Riffhai
      location: "Bahamas, Nassau",
      date_observed: new Date("2024-08-13"),
      length_m: 2.4,
      weight_kg: 68,
      notes: "Sehr entspannt mit Tauchern, beliebter Spot für Haitauchen."
    },
    {
      shark_id: createdSharks[34].id, // Australischer Schwarzspitzenhai
      location: "Australien, Queensland",
      date_observed: new Date("2024-09-27"),
      length_m: 1.7,
      weight_kg: 33,
      notes: "Jungtier in Mangroven, Kinderstube dokumentiert."
    },
    {
      shark_id: createdSharks[35].id, // Spinner-Hai
      location: "Florida, Palm Beach",
      date_observed: new Date("2024-06-30"),
      length_m: 2.3,
      weight_kg: 88,
      notes: "Spektakuläre Sprünge aus Wasser mit Drehung! 3-4 Rotationen."
    },
    {
      shark_id: createdSharks[36].id, // Atlantischer Scherbenhai
      location: "South Carolina, Charleston",
      date_observed: new Date("2024-07-19"),
      length_m: 1.4,
      weight_kg: 19,
      notes: "Schwarze Flossenspitzen, in flachem Wasser jagend."
    },
    {
      shark_id: createdSharks[37].id, // Borneo-Hai
      location: "Malaysia, Borneo",
      date_observed: new Date("2024-10-10"),
      length_m: 0.6,
      weight_kg: 2.8,
      notes: "Extrem seltene Art! Kleiner Küstenhai, kritisch gefährdet."
    },
    {
      shark_id: createdSharks[38].id, // Fleckhai
      location: "Thailand, Phuket",
      date_observed: new Date("2024-04-04"),
      length_m: 1.5,
      weight_kg: 19,
      notes: "Geflecktes Muster, versteckt in Korallenriff."
    },
    {
      shark_id: createdSharks[39].id, // Pazifischer Engelhai
      location: "Kalifornien, Catalina Island",
      date_observed: new Date("2024-11-03"),
      length_m: 1.4,
      weight_kg: 25,
      notes: "Flacher Körper, fast unsichtbar auf Sandboden."
    },
    {
      shark_id: createdSharks[40].id, // Japanischer Teppichhai
      location: "Japan, Okinawa",
      date_observed: new Date("2024-05-25"),
      length_m: 0.9,
      weight_kg: 14,
      notes: "Perfekte Tarnung, sieht aus wie Algen und Steine."
    },
    {
      shark_id: createdSharks[41].id, // Zebrahai
      location: "Indonesien, Bali",
      date_observed: new Date("2024-08-16"),
      length_m: 2.3,
      weight_kg: 28,
      notes: "Streifen als Jungtier, Flecken als Erwachsener. Friedlich."
    },
    {
      shark_id: createdSharks[42].id, // Ammenhai
      location: "Florida Keys, Key Largo",
      date_observed: new Date("2024-09-09"),
      length_m: 2.6,
      weight_kg: 105,
      notes: "Tagsüber ruhend in Höhle, nachtaktiv. Sehr friedlich."
    },
    {
      shark_id: createdSharks[43].id, // Bambushai
      location: "Vietnam, Nha Trang",
      date_observed: new Date("2024-03-18"),
      length_m: 0.9,
      weight_kg: 9,
      notes: "Schlank wie Bambus, lebt in flachen Riffen."
    },
    {
      shark_id: createdSharks[44].id, // Sägerochen
      location: "Florida, Everglades",
      date_observed: new Date("2024-06-11"),
      length_m: 5.2,
      weight_kg: 340,
      notes: "Säge mit 24 Zähnen, kritisch vom Aussterben bedroht."
    },
    {
      shark_id: createdSharks[45].id, // Kragenhai
      location: "Portugal, Tiefsee",
      date_observed: new Date("2024-02-28"),
      length_m: 1.9,
      weight_kg: 48,
      notes: "Lebendes Fossil! 300 Zähne, schlangenartiger Körper."
    },
    {
      shark_id: createdSharks[46].id, // Megamaul-Hai
      location: "Tiefsee, Pazifik",
      date_observed: new Date("2024-04-20"),
      length_m: 1.1,
      weight_kg: 7.5,
      notes: "Riesiges Maul im Verhältnis zum Körper, seltene Art."
    },
    {
      shark_id: createdSharks[47].id, // Atlantischer Zitterrochen
      location: "Atlantik, Mittelatlantik",
      date_observed: new Date("2024-07-14"),
      length_m: 1.7,
      weight_kg: 85,
      notes: "Kann elektrische Schocks von bis zu 220 Volt erzeugen!"
    },
    {
      shark_id: createdSharks[48].id, // Grönland-Eishai
      location: "Grönland, Arktis",
      date_observed: new Date("2024-01-05"),
      length_m: 6.2,
      weight_kg: 1350,
      notes: "Möglicherweise über 500 Jahre alt! Ältestes Wirbeltier der Welt."
    },
    {
      shark_id: createdSharks[48].id, // Grönland-Eishai (zweite Beobachtung)
      location: "Kanada, Baffin Bay",
      date_observed: new Date("2024-03-16"),
      length_m: 5.8,
      weight_kg: 1250,
      notes: "Schwimmt unter Eisschollen, extrem langsam aber ausdauernd."
    }
  ];

  for (const obsData of observations) {
    await prisma.observation.create({
      data: obsData
    });
  }

  console.log(`✅ ${observations.length} Beobachtungen hinzugefügt`);

  console.log(`🎉 Seeding abgeschlossen! ${createdSharks.length} Haie, 7 Habitate, 6 Diäten und ${observations.length} Beobachtungen erstellt.`);
}

main()
  .catch((e) => {
    console.error("❌ Fehler beim Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
