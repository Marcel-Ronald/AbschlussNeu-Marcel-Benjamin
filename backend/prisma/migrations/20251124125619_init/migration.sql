-- CreateTable
CREATE TABLE "Diet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diet_type" TEXT NOT NULL,
    "prey_example" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Habitat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "region" TEXT NOT NULL,
    "temperature_range" TEXT NOT NULL,
    "depth_range_m" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "average_length_m" REAL NOT NULL,
    "average_weight_kg" REAL NOT NULL,
    "lifespan_years" INTEGER NOT NULL,
    "habitat_id" INTEGER NOT NULL,
    "diet_id" INTEGER NOT NULL,
    "geburtsort" TEXT NOT NULL,
    "nahrung" TEXT NOT NULL,
    "gefahr" TEXT NOT NULL,
    "gewohnheiten" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "Shark_habitat_id_fkey" FOREIGN KEY ("habitat_id") REFERENCES "Habitat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Shark_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "Diet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shark_id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "date_observed" DATETIME NOT NULL,
    "length_m" REAL NOT NULL,
    "weight_kg" REAL NOT NULL,
    "notes" TEXT NOT NULL,
    CONSTRAINT "Observation_shark_id_fkey" FOREIGN KEY ("shark_id") REFERENCES "Shark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
