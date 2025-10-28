# Prisma notes
    - Prisma ist bereits installiert, wenn ihr ein anderes ORM nutzen wollt solltet ihr Prisma aus der package.json entfernen.

## Quickstart
1. `npm i` im Ordner backend
2. Benennt die `.example.env` in `.env` um und tragt dort eure Datenbankverbindung ein (Datenbank mit Tabellen muss bereits bestehen!!)
3. Führt den Befehl `npx prisma db pull` aus, um das Schmema aus der bestehenden Datenbank zu importieren
4. Führt den Befehl `npx prisma generate` aus, um einen Client zu erzeugen
5. Es existiert bereits eine Datei `client.js` im Ordner `prisma`, dort wird der Client gestartet und exportiert, wenn ihr in eurem Code Datenbankabfragen ausführen wollt, müsst ihr diesen Client importieren. Im Controller ist der import bereits vorbereitet (einach Kommentierung entfernen)
6. Mit `npx prisma studio` könnt ihr die Tabellenansicht von prisma starten


## Wie komme ich zur Datenbank
Es gibt 2 Varianten, die erste Variante hatten wir am Nachmittag genutzt:

1. Ihr legt eine Datenbank mit entsprechenden Tabellen in Postgres an:
    - Ihr erstellt ein Datenbankmodell mit einem Tool wie [drawsql.app](http://drawsql.app) und ladet das als sql-Datei herunter.
    - Ihr erstellt euch eine neue Datenbank in eurem Postgres mit `createdb -U postgres -h localhost -p 5432 dernamemeinerdatenbank`
    - Ihr erstellt die Tabellen mit der heruntergeladenen Datei in eurer Datenbank: `psql -U postgres -h localhost -p 5432 -d dernamemeinerdatenbank -f ./dieDatei.sql`
    - Jetzt könnt ihr in den obigen Schritten weitermachen

2. Ihr nutzt Prisma um eine Datenbank mit den Tabellen zu erstellen, dafür müsst ihr in die prisma.schema Datei ein eigenes Schema definieren, z.B. so etwa für eine User-Tabelle:
    ```js
    model User {
    id    Int     @id @default(autoincrement())
    name  String
    email String  @unique
    }
    ```
Danach könnt ihr das Schema nutzen, um eine eigene neue Datenbank und Tabelle zu erstellen. Auch hier müsst ihr in der .env-Datei zuerst eine Verbindung zur Datenbank definieren und auch einen Datenbanknamen angeben. Sollte die Datenbank noch nicht existieren, wird sie direkt mit erstellt. Danach führt ihr den Befehl `npx prisma migrate dev --name init`, welcher die Datenbnak und User Tabelle erzeugt.
Der Schritt 3 aus dem Quickstart entfällt bei dieser Variante. Auch spart ihr euch die Arbeit mit eurer Datenbank, der createdb und psql Befehl aus Variante 1, dafür müsst ihr das Schema selbst schreiben.

