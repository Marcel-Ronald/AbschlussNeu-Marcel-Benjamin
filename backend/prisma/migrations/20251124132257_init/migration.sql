-- CreateTable
CREATE TABLE "Diet" (
    "id" SERIAL NOT NULL,
    "diet_type" VARCHAR(100) NOT NULL,
    "prey_example" TEXT NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitat" (
    "id" SERIAL NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "temperature_range" VARCHAR(50) NOT NULL,
    "depth_range_m" VARCHAR(50) NOT NULL,

    CONSTRAINT "Habitat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shark" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "scientific_name" VARCHAR(150) NOT NULL,
    "average_length_m" DECIMAL(10,2) NOT NULL,
    "average_weight_kg" DECIMAL(10,2) NOT NULL,
    "lifespan_years" BIGINT NOT NULL,
    "habitat_id" INTEGER NOT NULL,
    "diet_id" INTEGER NOT NULL,
    "geburtsort" TEXT NOT NULL,
    "nahrung" TEXT NOT NULL,
    "gefahr" VARCHAR(255) NOT NULL,
    "gewohnheiten" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Shark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "shark_id" INTEGER NOT NULL,
    "location" VARCHAR(150) NOT NULL,
    "date_observed" DATE NOT NULL,
    "length_m" DECIMAL(10,2) NOT NULL,
    "weight_kg" DECIMAL(10,2) NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shark" ADD CONSTRAINT "sharks_habitat_id_foreign" FOREIGN KEY ("habitat_id") REFERENCES "Habitat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shark" ADD CONSTRAINT "sharks_diet_id_foreign" FOREIGN KEY ("diet_id") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "observations_shark_id_foreign" FOREIGN KEY ("shark_id") REFERENCES "Shark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
