import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// BigInt JSON serialization fix
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
// Get all sharks
app.get("/sharks/all", async (req, res) => {
  try {
    const sharks = await prisma.shark.findMany();
    res.send(sharks);
  } catch (error) {
    console.error("Fehler beim Laden der Haie:", error);
    res.status(500).send({ error: "Fehler beim Laden der Haie" });
  }
});

// Search sharks by name
app.get("/sharks", async (req, res) => {
  try {
    if (!req.query.searchterm) {
      return res.status(400).send({ error: "Suchbegriff fehlt" });
    }

    const sharks = await prisma.shark.findMany({
      where: {
        name: { contains: req.query.searchterm },
      },
    });

    if (sharks.length === 0) {
      return res.status(404).send({ message: "Keine Haie gefunden" });
    }

    res.send(sharks);
  } catch (error) {
    console.error("Fehler bei der Suche:", error);
    res.status(500).send({ error: "Fehler bei der Suche" });
  }
});

// Zentraler Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    error: true,
    message: err.message || "Internal Server Error",
  };
  res.status(status).send(payload);
});

app.listen(PORT, () => {
  console.log(`Server gestartet auf Port ${PORT}`);
});