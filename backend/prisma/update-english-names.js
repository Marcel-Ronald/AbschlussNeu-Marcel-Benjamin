import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🦈 Füge englische Hai-Namen hinzu...");

  const nameTranslations = {
    "Weißer Hai": "Great White Shark",
    "Hammerhai": "Hammerhead Shark",
    "Tigerhai": "Tiger Shark",
    "Walhai": "Whale Shark",
    "Blauhai": "Blue Shark",
    "Grönlandhai": "Greenland Shark",
    "Weißspitzen-Riffhai": "Whitetip Reef Shark",
    "Kurzflossen-Mako": "Shortfin Mako",
    "Bullenhai": "Bull Shark",
    "Zitronenhai": "Lemon Shark",
    "Riesenhai": "Basking Shark",
    "Schwarzspitzen-Riffhai": "Blacktip Reef Shark",
    "Sandtigerhai": "Sand Tiger Shark",
    "Fuchshai": "Thresher Shark",
    "Seidenhai": "Silky Shark",
    "Engelhai": "Angel Shark",
    "Grauer Riffhai": "Grey Reef Shark",
    "Langflossen-Mako": "Longfin Mako",
    "Sechskiemer-Hai": "Sixgill Shark",
    "Katzenhai": "Catshark",
    "Hornhai": "Horn Shark",
    "Galapagos-Hai": "Galapagos Shark",
    "Bronzehai": "Bronze Whaler",
    "Blaugrauer Hai": "Blue-grey Carpetshark",
    "Schwarzhai": "Blacktip Shark",
    "Nachthai": "Night Shark",
    "Weißspitzen-Hochseehai": "Oceanic Whitetip Shark",
    "Koboldhai": "Goblin Shark",
    "Riesenmaul-Hai": "Megamouth Shark",
    "Dornhai": "Spiny Dogfish",
    "Pazifischer Schlafhai": "Pacific Sleeper Shark",
    "Laternhai": "Lanternshark",
    "Zittern-Hai": "Tope Shark",
    "Karibischer Riffhai": "Caribbean Reef Shark",
    "Australischer Schwarzspitzenhai": "Australian Blacktip Shark",
    "Spinner-Hai": "Spinner Shark",
    "Atlantischer Scherbenhai": "Atlantic Sharpnose Shark",
    "Borneo-Hai": "Borneo Shark",
    "Fleckhai": "Spotted Wobbegong",
    "Pazifischer Engelhai": "Pacific Angel Shark",
    "Japanischer Teppichhai": "Japanese Wobbegong",
    "Zebrahai": "Zebra Shark",
    "Ammenhai": "Nurse Shark",
    "Bambushai": "Bamboo Shark",
    "Sägerochen": "Sawfish",
    "Kragenhai": "Frilled Shark",
    "Megamaul-Hai": "Megamouth Shark",
    "Grönland-Eishai": "Greenland Shark"
  };

  // Update jeden Hai mit englischem Namen
  for (const [germanName, englishName] of Object.entries(nameTranslations)) {
    const result = await prisma.shark.updateMany({
      where: { name: germanName },
      data: { name_en: englishName },
    });
    
    if (result.count > 0) {
      console.log(`✅ Updated: ${germanName} -> ${englishName}`);
    }
  }

  console.log("🎉 Alle englischen Namen wurden erfolgreich hinzugefügt!");
}

main()
  .catch((e) => {
    console.error("❌ Fehler:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
