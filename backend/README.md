# 🦈 Shark Wiki - Backend

## 📋 Überblick

Das Backend ist eine RESTful API, die Hai-Daten aus einer PostgreSQL-Datenbank bereitstellt und verschiedene Endpoints für Frontend-Anfragen zur Verfügung stellt.

## 🛠️ Technologie-Stack

- **Node.js** - JavaScript Runtime
- **Express.js** - Web-Framework
- **PostgreSQL** - Relationale Datenbank
- **Prisma ORM** - Datenbank-Toolkit
- **CORS** - Cross-Origin Resource Sharing

## 🚀 Installation & Start

```bash
# Dependencies installieren
npm install

# Datenbank einrichten
npx prisma generate
npx prisma db push

# Datenbank mit Seed-Daten füllen
npx prisma db seed

# Server starten
npm start

# Development mit Nodemon (automatischer Neustart)
npm run dev
```

Der Server läuft auf: `http://localhost:3001`

## 📁 Projektstruktur

```
backend/
├── prisma/
│   ├── schema.prisma       # Datenbank-Schema
│   ├── seed.js             # Seed-Daten (50 Haie)
│   ├── client.js           # Prisma Client Export
│   └── migrations/         # Datenbank-Migrationen
├── controller/
│   └── userController.js   # User-Logik (aktuell nicht verwendet)
├── __materials/
│   └── seed-data.sql       # Backup SQL-Daten
├── server.js               # Express Server & Routes
├── package.json
└── .env                    # Environment Variables
```

## 🗄️ Datenbank-Schema

```prisma
model Shark {
  id                 Int      @id @default(autoincrement())
  name               String   @unique
  scientific_name    String
  average_length_m   Float
  average_weight_kg  Float
  max_length_m       Float?
  max_weight_kg      Float?
  lifespan_years     Int?
  gefahr             String?
  image              String?
  nahrung            String
  geburtsort         String?
  gewohnheiten       String?
  created_at         DateTime @default(now())

  // Relationships
  habitat            Habitat?     @relation(fields: [habitatId], references: [id])
  habitatId          Int?
  diet               Diet?        @relation(fields: [dietId], references: [id])
  dietId             Int?
  observations       Observation[]
}

model Habitat {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  sharks      Shark[]
}

model Diet {
  id          Int      @id @default(autoincrement())
  type        String   @unique
  description String?
  sharks      Shark[]
}

model Observation {
  id          Int      @id @default(autoincrement())
  location    String
  date        DateTime
  notes       String?
  shark       Shark    @relation(fields: [sharkId], references: [id])
  sharkId     Int
}
```

## 🔌 API-Endpoints

### Haie

```javascript
// Alle Haie abrufen
GET /sharks/all
Response: Array<Shark>

// Einzelnen Hai abrufen
GET /sharks/:id
Response: Shark | { error: "Hai nicht gefunden" }

// Haie suchen
GET /sharks/search?q=weißer
Response: Array<Shark>

// Gefährliche Haie
GET /sharks/dangerous
Response: Array<Shark>

// Größte Haie
GET /sharks/largest
Response: Array<Shark>

// Tiefsee-Haie
GET /sharks/deep-sea
Response: Array<Shark>
```

### Habitate & Diäten

```javascript
// Alle Habitate
GET /habitats
Response: Array<Habitat>

// Alle Diäten
GET /diets
Response: Array<Diet>
```

## 📊 Seed-Daten

Das Projekt enthält 50 vollständige Hai-Datensätze mit:

- Deutscher Name
- Wissenschaftlicher Name
- Durchschnittliche & maximale Größe
- Gewicht
- Lebenserwartung
- Gefahrenstufe
- Bild-URL
- Nahrung
- Geburtsort
- Gewohnheiten

### Seed ausführen

```bash
# Datenbank leeren und neu befüllen
npx prisma db seed

# Manuell über Prisma Studio
npx prisma studio
```

### Enthaltene Hai-Arten (Auszug)

1. **Weißer Hai** - Carcharodon carcharias
2. **Hammerhai** - Sphyrna mokarran
3. **Tigerhai** - Galeocerdo cuvier
4. **Walhai** - Rhincodon typus
5. **Blauhai** - Prionace glauca
6. **Grönlandhai** - Somniosus microcephalus
7. **Kurzflossen-Mako** - Isurus oxyrinchus
8. **Bullenhai** - Carcharhinus leucas
   ... und 42 weitere Arten

## 🔒 Environment Variables

```env
# .env Datei
DATABASE_URL="postgresql://user:password@localhost:5432/shark_wiki?schema=public"
PORT=3001
```

## 🛠️ Prisma-Befehle

```bash
# Client neu generieren (nach Schema-Änderung)
npx prisma generate

# Datenbank mit Schema synchronisieren
npx prisma db push

# Datenbank zurücksetzen
npx prisma db push --force-reset

# Prisma Studio öffnen (GUI für Datenbank)
npx prisma studio

# Migration erstellen
npx prisma migrate dev --name migration_name

# Seed ausführen
npx prisma db seed
```

## 📡 Server-Konfiguration

**server.js**

```javascript
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/sharks/all", async (req, res) => {
  const sharks = await prisma.shark.findMany({
    include: {
      habitat: true,
      diet: true,
    },
  });
  res.json(sharks);
});

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
```

## 🔍 Query-Beispiele

### Alle Haie mit Relationships

```javascript
const sharks = await prisma.shark.findMany({
  include: {
    habitat: true,
    diet: true,
    observations: true,
  },
});
```

### Haie filtern

```javascript
// Nach Größe sortiert
const largest = await prisma.shark.findMany({
  orderBy: {
    average_length_m: "desc",
  },
  take: 10,
});

// Nach Namen suchen
const results = await prisma.shark.findMany({
  where: {
    name: {
      contains: searchTerm,
      mode: "insensitive",
    },
  },
});
```

### Neuen Hai erstellen

```javascript
const newShark = await prisma.shark.create({
  data: {
    name: "Megalodon",
    scientific_name: "Carcharocles megalodon",
    average_length_m: 16.0,
    average_weight_kg: 50000,
    nahrung: "Große Meeressäuger",
    gefahr: "Ausgestorben",
  },
});
```

## 🐛 Error Handling

```javascript
app.get("/sharks/:id", async (req, res) => {
  try {
    const shark = await prisma.shark.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!shark) {
      return res.status(404).json({
        error: "Hai nicht gefunden",
      });
    }

    res.json(shark);
  } catch (error) {
    res.status(500).json({
      error: "Server-Fehler",
      details: error.message,
    });
  }
});
```

## 📊 Datenbank-Statistiken

Nach dem Seeding:

- **50 Hai-Arten**
- **5 Habitate** (Korallenriffe, Tiefsee, Küstengewässer, Offener Ozean, Kaltwasser)
- **4 Diät-Typen** (Fleischfresser, Planktonfresser, Allesfresser, Aasfresser)
- **Beobachtungen** für realistische Testdaten

## 🚀 Deployment

### Lokale Produktion

```bash
# Datenbank vorbereiten
npx prisma db push
npx prisma db seed

# Server starten
npm start
```

### Cloud-Deployment (z.B. Railway, Render)

1. PostgreSQL-Datenbank erstellen
2. `DATABASE_URL` in Environment Variables setzen
3. Build-Command: `npx prisma generate && npx prisma db push`
4. Start-Command: `npm start`

## 🔧 Entwicklung

### Neue Endpoints hinzufügen

```javascript
// server.js
app.get("/sharks/filter/:type", async (req, res) => {
  const { type } = req.params;

  // Filter-Logik
  const sharks = await prisma.shark.findMany({
    where: {
      // Bedingungen
    },
  });

  res.json(sharks);
});
```

### Schema ändern

```bash
# 1. schema.prisma bearbeiten
# 2. Migration erstellen
npx prisma migrate dev --name add_new_field

# 3. Client neu generieren
npx prisma generate
```

## 📈 Performance-Tipps

1. **Indexe nutzen**: `@@index([field])` in Schema
2. **Select einschränken**: Nur benötigte Felder abfragen
3. **Pagination**: `skip` und `take` für große Datensätze
4. **Connection Pooling**: Prisma managed automatisch

## 🛡️ Sicherheit

- **CORS** richtig konfigurieren
- **Input-Validierung** für alle Endpoints
- **SQL-Injection**: Prisma schützt automatisch
- **Rate Limiting** für API (z.B. express-rate-limit)
- **Environment Variables** für sensitive Daten

## 📚 Nützliche Befehle

```bash
# Server-Logs anzeigen
npm start

# Datenbank inspizieren
npx prisma studio

# Schema validieren
npx prisma validate

# Datenbank-Status
npx prisma db pull

# Seed-Datei testen
node prisma/seed.js
```

## 🐞 Troubleshooting

**Problem**: Port bereits belegt

```bash
# Lösung: Anderen Port verwenden
PORT=3002 npm start
```

**Problem**: Datenbank-Connection Fehler

```bash
# Lösung: .env prüfen und Datenbank neu starten
npx prisma db push
```

**Problem**: Prisma Client nicht gefunden

```bash
# Lösung: Client neu generieren
npx prisma generate
```

---

**Entwickelt mit ❤️ für die Hai-Community 🦈**
