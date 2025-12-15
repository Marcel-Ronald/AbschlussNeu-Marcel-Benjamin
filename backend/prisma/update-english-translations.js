import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🦈 Starte Update der englischen Übersetzungen...");

  // Englische Übersetzungen für jeden Hai
  const translations = [
    {
      id: 1,
      geburtsort_en: "Coastal waters worldwide, especially California, South Africa, Australia",
      nahrung_en: "Seals, sea lions, fish, sea turtles, whales (carrion)",
      gefahr_en: "High - Responsible for most shark attacks on humans",
      gewohnheiten_en: "Solitary, hunts at sunrise and sunset, can travel great distances, prefers cool waters"
    },
    {
      id: 2,
      geburtsort_en: "Tropical and subtropical coastal waters worldwide",
      nahrung_en: "Rays, fish, squid, crustaceans",
      gefahr_en: "Medium - Rarely aggressive towards humans",
      gewohnheiten_en: "Often travels in schools, uses head shape as sensor, migrates seasonally, hunts on seafloor"
    },
    {
      id: 3,
      geburtsort_en: "Tropical and subtropical waters worldwide",
      nahrung_en: "Everything - Fish, turtles, birds, dolphins, even trash",
      gefahr_en: "High - Second most dangerous shark to humans",
      gewohnheiten_en: "Nocturnal, solitary, 'garbage can of the sea', travels great distances, prefers murky water"
    },
    {
      id: 4,
      geburtsort_en: "Warm tropical oceans worldwide",
      nahrung_en: "Plankton, small fish, krill",
      gefahr_en: "None - Completely harmless to humans",
      gewohnheiten_en: "Filter feeder, slow swimmer, often at surface, migrates to plankton-rich areas, peaceful"
    },
    {
      id: 5,
      geburtsort_en: "Open oceans worldwide in temperate zones",
      nahrung_en: "Squid, small fish, crustaceans",
      gefahr_en: "Low - Can be curious but rarely dangerous",
      gewohnheiten_en: "Deep sea dweller, migrates extreme distances, lives in great depths, elegant and fast"
    },
    {
      id: 6,
      geburtsort_en: "Arctic and subarctic waters",
      nahrung_en: "Fish, seals, carrion, sometimes reindeer",
      gefahr_en: "Very low - Lives in extreme depth",
      gewohnheiten_en: "Extremely slow, lives in ice-cold water, can live over 400 years, deepest living"
    },
    {
      id: 7,
      geburtsort_en: "Coral reefs in the Indo-Pacific",
      nahrung_en: "Small fish, crustaceans, squid",
      gefahr_en: "Very low - Shy and harmless",
      gewohnheiten_en: "Nocturnal, rests in caves during day, hunts in groups, site-faithful, loves coral reefs"
    },
    {
      id: 8,
      geburtsort_en: "Temperate and tropical oceans worldwide",
      nahrung_en: "Tuna, swordfish, other sharks",
      gefahr_en: "Medium - Can be aggressive when provoked",
      gewohnheiten_en: "Fastest shark (up to 60 km/h), jumps out of water, actively hunts, deep sea hunter"
    },
    {
      id: 9,
      geburtsort_en: "Coastal waters and river mouths worldwide",
      nahrung_en: "Fish, rays, other sharks, birds, dolphins",
      gefahr_en: "Very high - Extremely aggressive, often in shallow water",
      gewohnheiten_en: "Can live in freshwater, territorial, aggressive, hunts in murky water, often near rivers"
    },
    {
      id: 10,
      geburtsort_en: "Subtropical coastal waters, mangrove forests",
      nahrung_en: "Fish, rays, crustaceans, seabirds",
      gefahr_en: "Low - Normally not aggressive",
      gewohnheiten_en: "Social, forms groups, returns to birth sites, nocturnal, intelligent"
    },
    {
      id: 11,
      geburtsort_en: "Temperate waters worldwide",
      nahrung_en: "Plankton, small fish",
      gefahr_en: "None - Peaceful filter feeder",
      gewohnheiten_en: "Second largest shark, swims with open mouth, migrates seasonally, slow, often at surface"
    },
    {
      id: 12,
      geburtsort_en: "Tropical coral reefs in the Indo-Pacific",
      nahrung_en: "Small fish, squid, crustaceans",
      gefahr_en: "Very low - Shy of humans",
      gewohnheiten_en: "Very active, sometimes jumps out of water, lives in shallow water, hunts in groups"
    },
    {
      id: 13,
      geburtsort_en: "Subtropical and temperate coasts worldwide",
      nahrung_en: "Fish, smaller sharks, rays, squid",
      gefahr_en: "Low - Despite fearsome appearance, peaceful",
      gewohnheiten_en: "Swims slowly, gulps air for buoyancy, nocturnal, rests in caves, social"
    },
    {
      id: 14,
      geburtsort_en: "Temperate and tropical oceans",
      nahrung_en: "Small fish (sardines, mackerel), squid",
      gefahr_en: "Very low - Shy and harmless",
      gewohnheiten_en: "Uses long tail to hunt (stuns prey), jumps out of water, hunts in groups"
    },
    {
      id: 15,
      geburtsort_en: "Tropical deep sea waters worldwide",
      nahrung_en: "Fish, squid, crustaceans",
      gefahr_en: "Medium - Can be curious and persistent",
      gewohnheiten_en: "Fast swimmer, follows tuna schools, lives in great depths, social"
    },
    {
      id: 16,
      geburtsort_en: "Sandy sea floors in temperate waters",
      nahrung_en: "Bottom fish, crustaceans, mollusks",
      gefahr_en: "Low - Only bites when disturbed",
      gewohnheiten_en: "Camouflages in sand, ambushes prey, nocturnal, flat like a ray, site-faithful"
    },
    {
      id: 17,
      geburtsort_en: "Coral reefs in the Indo-Pacific",
      nahrung_en: "Reef fish, squid, crustaceans",
      gefahr_en: "Medium - Territorial, shows threat behavior",
      gewohnheiten_en: "Very territorial, patrols reef edges, shows threat postures, nocturnal, forms schools"
    },
    {
      id: 18,
      geburtsort_en: "Tropical and subtropical oceans",
      nahrung_en: "Squid, fish, dolphins",
      gefahr_en: "Medium - Rarer than shortfin mako",
      gewohnheiten_en: "Deep sea shark, slower than shortfin mako, rarely seen, large pectoral fins"
    },
    {
      id: 19,
      geburtsort_en: "Deep sea worldwide, temperate waters",
      nahrung_en: "Fish, other sharks, seals, carrion",
      gefahr_en: "Low - Usually lives in great depth",
      gewohnheiten_en: "Primitive shark, six gill slits, nocturnal, rises at night, deep sea predator"
    },
    {
      id: 20,
      geburtsort_en: "Coastal waters and continental shelf worldwide",
      nahrung_en: "Small fish, worms, crustaceans",
      gefahr_en: "None - Completely harmless",
      gewohnheiten_en: "Nocturnal, hides during day, lives on bottom, small and shy, lays eggs"
    },
    {
      id: 21,
      geburtsort_en: "Pacific coast of North America",
      nahrung_en: "Sea urchins, crustaceans, small fish",
      gefahr_en: "None - Harmless",
      gewohnheiten_en: "Nocturnal, hides in rock crevices, slow, can crawl on land, lays spiral eggs"
    },
    {
      id: 22,
      geburtsort_en: "Galapagos Islands and tropical islands",
      nahrung_en: "Fish, squid, sea lions",
      gefahr_en: "Medium to High - Can be aggressive",
      gewohnheiten_en: "Curious, often near islands, territorial, swims in groups, prefers clear water"
    },
    {
      id: 23,
      geburtsort_en: "Subtropical coastal waters worldwide",
      nahrung_en: "Fish, rays, squid",
      gefahr_en: "Medium - Confusion with bull shark possible",
      gewohnheiten_en: "Migrates seasonally, forms large schools, jumps during hunting, prefers murky water"
    },
    {
      id: 24,
      geburtsort_en: "Temperate and tropical coastal waters",
      nahrung_en: "Bottom fish, rays, crustaceans",
      gefahr_en: "Very low - Peaceful",
      gewohnheiten_en: "Lives on seafloor, slow, migrates in large groups, prefers sandy bottoms"
    },
    {
      id: 25,
      geburtsort_en: "Atlantic, Mediterranean, Pacific",
      nahrung_en: "Fish, squid, crustaceans",
      gefahr_en: "Low - Shy of humans",
      gewohnheiten_en: "Deep sea shark, migrates great distances, lives in deep waters, rarely seen"
    },
    {
      id: 26,
      geburtsort_en: "Tropical coral reefs, Indo-Pacific",
      nahrung_en: "Crustaceans, squid, small fish",
      gefahr_en: "None - Very small and harmless",
      gewohnheiten_en: "Nocturnal, rests in crevices during day, very small, social, peaceful"
    },
    {
      id: 27,
      geburtsort_en: "Tropical and subtropical oceans",
      nahrung_en: "Fish, squid, seabirds, carrion",
      gefahr_en: "Very high - Extremely dangerous, especially at shipwrecks",
      gewohnheiten_en: "Follows ships, often involved in disasters, very aggressive, curious, slow but persistent"
    },
    {
      id: 28,
      geburtsort_en: "Deep sea worldwide",
      nahrung_en: "Deep sea fish, squid, crustaceans",
      gefahr_en: "None - Lives in extreme depth",
      gewohnheiten_en: "Very rarely seen, extendable jaw, lives at 200-1300m depth, pink colored, slow"
    },
    {
      id: 29,
      geburtsort_en: "Deep sea in tropical waters",
      nahrung_en: "Plankton, small fish, jellyfish",
      gefahr_en: "None - Filter feeder, very rare",
      gewohnheiten_en: "Very rare deep sea shark, huge mouth, filters plankton, glowing mouth, rises at night"
    },
    {
      id: 30,
      geburtsort_en: "Temperate and subarctic waters worldwide",
      nahrung_en: "Small fish, squid, crustaceans",
      gefahr_en: "Very low - Small spines can sting",
      gewohnheiten_en: "Poisonous dorsal spines, lives in large schools, very long-lived (100+ years), important food fish"
    },
    {
      id: 31,
      geburtsort_en: "North Pacific, cold waters",
      nahrung_en: "Fish, squid, carrion",
      gefahr_en: "Very low - Sluggish and slow",
      gewohnheiten_en: "Extremely slow, can live 200+ years, lives in deep sea, sluggish, prefers cold water"
    },
    {
      id: 32,
      geburtsort_en: "Deep sea worldwide",
      nahrung_en: "Tiny fish, crustaceans, squid",
      gefahr_en: "None - Tiny small",
      gewohnheiten_en: "Bioluminescent (glows), smallest shark, lives in extreme depth, uses light for camouflage"
    },
    {
      id: 33,
      geburtsort_en: "Coastal waters Atlantic and Mediterranean",
      nahrung_en: "Fish, crustaceans, squid",
      gefahr_en: "Low - Usually shy",
      gewohnheiten_en: "Migrates seasonally, lives in medium depths, social, active hunter"
    },
    {
      id: 34,
      geburtsort_en: "Caribbean Sea, coral reefs",
      nahrung_en: "Reef fish, squid, rays",
      gefahr_en: "Medium - Can be territorial",
      gewohnheiten_en: "Prefers coral reefs, territorial, rests during day, hunts at night, site-faithful"
    },
    {
      id: 35,
      geburtsort_en: "Coastal waters North Australia, Indo-Pacific",
      nahrung_en: "Small fish, crustaceans",
      gefahr_en: "Very low - Small and shy",
      gewohnheiten_en: "Lives in shallow water, very active, jumps out of water, social, prefers mangrove forests"
    },
    {
      id: 36,
      geburtsort_en: "Tropical and subtropical coasts worldwide",
      nahrung_en: "Small fish, squid",
      gefahr_en: "Very low - Shy of humans",
      gewohnheiten_en: "Spectacular jumps with spins, hunts in schools, fast swimmer, migrates seasonally"
    },
    {
      id: 37,
      geburtsort_en: "Atlantic, Mediterranean",
      nahrung_en: "Small fish, squid, crustaceans",
      gefahr_en: "None - Small and harmless",
      gewohnheiten_en: "Lives in medium depths, nocturnal, rarely seen, social"
    },
    {
      id: 38,
      geburtsort_en: "Borneo, Southeast Asia (freshwater)",
      nahrung_en: "Small fish, crustaceans",
      gefahr_en: "None - Extremely rare and small",
      gewohnheiten_en: "Lives in rivers, extremely rare (only few specimens known), small, nocturnal"
    },
    {
      id: 39,
      geburtsort_en: "Coral reefs Indo-Pacific",
      nahrung_en: "Small fish, crustaceans, worms",
      gefahr_en: "None - Peaceful and small",
      gewohnheiten_en: "Nocturnal, hides during day, beautiful spotted pattern, lives on bottom"
    },
    {
      id: 40,
      geburtsort_en: "Pacific coast, sandy bottoms",
      nahrung_en: "Bottom fish, squid, crustaceans",
      gefahr_en: "Low - Only bites when disturbed",
      gewohnheiten_en: "Buries itself in sand, ambushes prey, flat like ray, lightning-fast attack"
    },
    {
      id: 41,
      geburtsort_en: "Japanese coasts, rocky bottoms",
      nahrung_en: "Small fish, crustaceans, squid",
      gefahr_en: "Low - Can bite when disturbed",
      gewohnheiten_en: "Perfect camouflage, lies motionless, sucks in prey, nocturnal"
    },
    {
      id: 42,
      geburtsort_en: "Indo-Pacific, coral reefs",
      nahrung_en: "Mollusks, crustaceans, small fish",
      gefahr_en: "None - Very peaceful",
      gewohnheiten_en: "Beautiful pattern, very peaceful, often lies on bottom, nocturnal, popular with divers"
    },
    {
      id: 43,
      geburtsort_en: "Tropical coasts, Caribbean, Atlantic",
      nahrung_en: "Crustaceans, squid, fish",
      gefahr_en: "Very low - Peaceful, only bites when harassed",
      gewohnheiten_en: "Rests in groups during day, sucks prey from bottom, very peaceful, nocturnal"
    },
    {
      id: 44,
      geburtsort_en: "Indo-Pacific, coral reefs",
      nahrung_en: "Small fish, crustaceans, worms",
      gefahr_en: "None - Completely harmless",
      gewohnheiten_en: "Very small, slender, nocturnal, hides in crevices, can survive on land"
    },
    {
      id: 45,
      geburtsort_en: "Tropical and subtropical coasts",
      nahrung_en: "Fish, crustaceans",
      gefahr_en: "Low - Saw can be dangerous",
      gewohnheiten_en: "Uses saw for digging and stunning, lives on bottom, threatened by overfishing"
    },
    {
      id: 46,
      geburtsort_en: "Deep sea worldwide",
      nahrung_en: "Squid, fish",
      gefahr_en: "None - Lives in extreme depth",
      gewohnheiten_en: "Living fossil (300 million years old), eel-like body, very rarely seen, bizarre shape"
    },
    {
      id: 47,
      geburtsort_en: "Various deep sea regions",
      nahrung_en: "Plankton, jellyfish, small fish",
      gefahr_en: "None - Filter feeder",
      gewohnheiten_en: "First discovered 1976, very rare, huge mouth, filters plankton, lives in deep sea"
    },
    {
      id: 48,
      geburtsort_en: "Arctic, North Atlantic (extremely cold waters)",
      nahrung_en: "Fish, seals, reindeer, carrion",
      gefahr_en: "Very low - Extremely slow, lives in depth",
      gewohnheiten_en: "Oldest vertebrate (500+ years), extremely slow, poisonous flesh, lives in ice-cold water, almost blind"
    }
  ];

  // Update jede Hai-Eintrag mit englischen Übersetzungen
  for (const translation of translations) {
    await prisma.shark.update({
      where: { id: translation.id },
      data: {
        geburtsort_en: translation.geburtsort_en,
        nahrung_en: translation.nahrung_en,
        gefahr_en: translation.gefahr_en,
        gewohnheiten_en: translation.gewohnheiten_en,
      },
    });
    console.log(`✅ Updated shark ID ${translation.id}`);
  }

  console.log("🎉 Alle englischen Übersetzungen wurden erfolgreich hinzugefügt!");
}

main()
  .catch((e) => {
    console.error("❌ Fehler:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
