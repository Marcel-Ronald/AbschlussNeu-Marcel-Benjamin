# 🦈 Shark Wiki - Präsentation (15 Min)

## 📋 Präsentationsablauf

### 1. Intro & Demo (3 Min)

**Live-Demo der wichtigsten Features:**

- Startseite mit Statistiken & Animationen
- Suchfunktion demonstrieren
- Filter-System zeigen (Top 10 Gefährlichste, Größte, etc.)
- Responsive Design auf verschiedenen Bildschirmgrößen

### 2. Technologie-Stack (2 Min)

**Frontend:**

- ⚛️ React 19 mit Hooks (useState, useEffect)
- 🎨 Vite für schnelles Development
- 🧭 React Router für Navigation
- 💅 Custom CSS (3500+ Zeilen) mit Animationen

**Backend:**

- 🚀 Node.js + Express Server
- 🗄️ PostgreSQL Datenbank
- 🔧 Prisma ORM für Datenbankzugriff
- 📊 RESTful API mit 50 Haien

### 3. Hauptfeatures demonstrieren (7 Min)

#### A) Interaktive Galerie (1.5 Min)

- Filter nach Kategorien
- Echtzeit-Suche mit Autocomplete
- Skeleton Loader während des Ladens
- Hover-Effekte und Animationen

#### B) Hai-Vergleichstool (2 Min)

- 2 Haie auswählen
- 3 verschiedene Ansichtsmodi:
  - Nebeneinander
  - Überlagert
  - Gestapelt (Längen-/Gewichtsvergleich)
- Interaktive SVG-Grafiken
- Größenvergleich mit Mensch

#### C) Gefahrenzonen & Lebensräume (1.5 Min)

- Interaktive Karten mit Hotspots
- Detaillierte Informationen zu Hai-Lebensräumen
- Sicherheitsrichtlinien mit Icons

#### D) Quiz-System (1 Min)

- Multiple-Choice Fragen
- Punktesystem
- Sofortiges Feedback

#### E) Design & UX (1 Min)

- Animierter Ozean-Hintergrund mit schwebenden Haien
- Glassmorphism Design
- Dark Blue Theme durchgängig
- Smooth Scroll & Back-to-Top Button

### 4. Technische Highlights (2 Min)

**Code-Qualität:**

- Modulare Komponenten-Struktur
- Wiederverwendbare Filter-Logik
- Clean Code Prinzipien
- Error Handling

**Performance:**

- Lazy Loading von Bildern
- Optimierte Datenbankabfragen
- Debouncing bei Suche (300ms)

**Datenbank:**

- 50 Haie mit vollständigen Informationen
- Strukturierte Relationships (Habitats, Diets, Observations)
- Seeding-System für konsistente Daten

### 5. Q&A & Abschluss (1 Min)

---

## 🎯 Präsentations-Tipps

### Vor der Präsentation:

1. ✅ Server starten:

   ```bash
   # Terminal 1
   cd backend && npm start

   # Terminal 2
   cd frontend && npm run dev
   ```

2. ✅ Browser vorbereiten:

   - Tab mit Startseite öffnen
   - Developer Tools bereit (für Responsive Demo)
   - Einen Hai vorher auswählen (schnellere Demo)

3. ✅ Testdaten prüfen:
   ```bash
   cd backend && npx prisma db seed
   ```

### Während der Präsentation:

1. **Nicht zu viel Code zeigen** - Fokus auf Features
2. **Live-Demo** ist wichtiger als Folien
3. **Interaktion** - Funktionen wirklich benutzen
4. **Backup-Plan** - Screenshots falls Server abstürzt

### Key Selling Points:

- ✨ **Professionelles Design** - Nicht wie ein Studentenprojekt
- 🎨 **Moderne Technologien** - React 19, Vite, Prisma
- 📱 **Voll Responsive** - Mobile-First Approach
- 🔥 **Einzigartige Features** - SVG-Vergleichstool, Interactive Habitats
- 📊 **Echte Datenbank** - 50+ Haie mit vollständigen Daten

---

## 📸 Demo-Reihenfolge (empfohlen)

1. **Startseite** (30 Sek)

   - Animierte Statistiken zeigen
   - Featured Sharks Section
   - Quick Links demonstrieren

2. **Galerie + Filter** (1 Min)

   - "Top 10 Gefährlichste" Filter
   - Suche nach "Weißer Hai"
   - Card Hover-Effekte

3. **Vergleichstool** (2 Min)

   - Weißer Hai vs Walhai auswählen
   - Alle 3 Ansichtsmodi durchgehen
   - Größenvergleich hervorheben

4. **Lebensräume** (1 Min)

   - Great Barrier Reef öffnen
   - Detailmodal zeigen
   - Smooth Transitions

5. **Gefahrenzonen** (1 Min)

   - Hotspot-Karte
   - Sicherheitsrichtlinien scrollen

6. **Quiz** (30 Sek)

   - Eine Frage beantworten
   - Punktesystem zeigen

7. **Responsive Design** (30 Sek)
   - Developer Tools öffnen
   - Mobile Ansicht zeigen
   - Hamburger Menu (falls vorhanden)

---

## 🎤 Präsentations-Script (Optional)

### Opening (30 Sek):

> "Hallo! Wir präsentieren euch heute **Shark Wiki** - eine interaktive Web-Anwendung zur Erkundung der faszinierenden Welt der Haie. In den nächsten 15 Minuten zeigen wir euch, wie wir mit modernen Web-Technologien eine bildungsorientierte und visuell ansprechende Plattform entwickelt haben."

### Tech-Stack (1 Min):

> "Unser Stack besteht aus React 19 im Frontend mit Vite als Build-Tool, einer Express/Node.js API im Backend, und PostgreSQL als Datenbank mit Prisma als ORM. Wir haben über 3500 Zeilen Custom CSS geschrieben und 50 Hai-Arten mit vollständigen Informationen in unserer Datenbank."

### Features (5 Min):

> "Lasst mich euch die Hauptfeatures zeigen..." [Live-Demo]

### Closing (30 Sek):

> "Zusammenfassend haben wir eine vollständige Full-Stack-Anwendung entwickelt, die nicht nur technisch anspruchsvoll ist, sondern auch Spaß macht zu benutzen. Vielen Dank! Gibt es Fragen?"

---

## 🚀 Backup-Befehle

Falls etwas schief geht:

```bash
# Server neu starten
cd backend && npm start

# Frontend neu starten
cd frontend && npm run dev

# Datenbank neu seeden
cd backend && npx prisma db seed

# Kompletter Reset
cd backend
npx prisma db push --force-reset
npx prisma db seed
```

---

## 📊 Projekt-Statistiken zum Nennen

- **50 Hai-Arten** in der Datenbank
- **3500+ Zeilen CSS**
- **20+ React-Komponenten**
- **6 Hauptseiten** (Home, Gallery, Comparison, Habitats, Danger Zones, Quiz)
- **4 Filter-Kategorien**
- **3 Vergleichs-Ansichten**
- **Vollständig responsive** Design
- **RESTful API** mit Express
- **PostgreSQL** Datenbank mit Prisma ORM

---

## 🎯 Erfolg messen

Die Präsentation war erfolgreich, wenn:

- ✅ Alle Hauptfeatures live funktioniert haben
- ✅ Das Design beeindruckt hat
- ✅ Technische Fragen kompetent beantwortet wurden
- ✅ Zeitlimit von 15 Min eingehalten wurde
- ✅ Mindestens 2-3 "Wow"-Momente gab

**Viel Erfolg! 🦈🚀**
