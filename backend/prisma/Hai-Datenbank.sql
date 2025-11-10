CREATE TABLE "sharks"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "scientific_name" VARCHAR(150) NOT NULL,
    "average_length_m" NUMERIC(10,2) NOT NULL,
    "average_weight_kg" NUMERIC(10,2) NOT NULL,
    "lifespan_years" BIGINT NOT NULL,
    "habitat_id" BIGINT NOT NULL,
    "diet_id" BIGINT NOT NULL
);
ALTER TABLE
    "sharks" ADD PRIMARY KEY("id");
CREATE TABLE "habitats"(
    "id" SERIAL NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "temperature_range" VARCHAR(50) NOT NULL,
    "depth_range_m" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "habitats" ADD PRIMARY KEY("id");
CREATE TABLE "diets"(
    "id" SERIAL NOT NULL,
    "diet_type" VARCHAR(100) NOT NULL,
    "prey_example" TEXT NOT NULL
);
ALTER TABLE
    "diets" ADD PRIMARY KEY("id");
CREATE TABLE "observations"(
    "id" SERIAL NOT NULL,
    "shark_id" BIGINT NOT NULL,
    "location" VARCHAR(150) NOT NULL,
    "date_observed" DATE NOT NULL,
    "length_m" NUMERIC(10,2) NOT NULL,
    "weight_kg" NUMERIC(10,2) NOT NULL,
    "notes" TEXT NOT NULL
);
ALTER TABLE
    "observations" ADD PRIMARY KEY("id");
ALTER TABLE
    "sharks" ADD CONSTRAINT "sharks_habitat_id_foreign" FOREIGN KEY("habitat_id") REFERENCES "habitats"("id");
ALTER TABLE 
    "sharks" ADD CONSTRAINT "sharks_diet_id_foreign" FOREIGN KEY("diet_id") REFERENCES "diets"("id");
ALTER TABLE
    "observations" ADD CONSTRAINT "observations_shark_id_foreign" FOREIGN KEY("shark_id") REFERENCES "sharks"("id");