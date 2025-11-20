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
    }
  ];

  for (const obsData of observations) {
    await prisma.observation.create({
      data: obsData
    });
  }

  console.log(`✅ ${observations.length} Beobachtungen hinzugefügt`);

  console.log("🎉 Seeding abgeschlossen! 10 Haie, 4 Habitate, 4 Diäten und 20 Beobachtungen erstellt.");
}

main()
  .catch((e) => {
    console.error("❌ Fehler beim Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
