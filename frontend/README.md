# 🦈 Shark Wiki - Frontend

## 📋 Überblick

Das Frontend ist eine moderne React-Anwendung, die eine interaktive und visuell ansprechende Benutzeroberfläche für die Erkundung von Hai-Arten bietet.

## 🛠️ Technologie-Stack

- **React 19.1.1** - UI-Framework mit Hooks
- **Vite 7.1.7** - Build-Tool & Dev-Server
- **React Router DOM** - Client-seitiges Routing
- **Custom CSS** - 4000+ Zeilen handgeschriebenes CSS
- **ESLint** - Code-Qualität

## 🚀 Installation & Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build

# Preview des Production Builds
npm run preview
```

Der Dev-Server läuft standardmäßig auf: `http://localhost:5173`

## 📁 Projektstruktur

```
frontend/
├── src/
│   ├── components/          # React-Komponenten
│   │   ├── BackToTop.jsx   # Scroll-to-Top Button
│   │   ├── FilterBar.jsx   # Filter-Buttons mit Badges
│   │   ├── Footer.jsx      # App-Footer
│   │   ├── HomePage.jsx    # Startseite
│   │   ├── Impressum.jsx   # Impressum-Seite
│   │   ├── Login.jsx       # Login-Component
│   │   ├── OceanBackground.jsx  # Animierter Hintergrund
│   │   ├── SearchBar.jsx   # Suchleiste mit Autocomplete
│   │   ├── SharkCard.jsx   # Einzelne Hai-Karte
│   │   ├── SharkComparison.jsx  # Vergleichstool
│   │   ├── SharkDangerZones.jsx # Gefahrenzonen
│   │   ├── SharkDetails.jsx     # Über Haie
│   │   ├── SharkHabitats.jsx    # Lebensräume
│   │   ├── SharkList.jsx   # Hai-Galerie
│   │   └── SharkQuiz.jsx   # Quiz
│   ├── context/
│   │   └── UserContext.jsx # User State Management
│   ├── utils/
│   │   └── sharkFilters.js # Filter-Logik
│   ├── App.jsx             # Haupt-App-Komponente
│   ├── main.jsx            # Entry Point
│   └── styles.css          # Globale Styles
├── public/
│   └── images/sharks/      # Hai-Bilder
├── index.html              # HTML Template
├── vite.config.js          # Vite Konfiguration
└── package.json
```

## 🎨 Hauptfeatures

### 1. **Startseite (HomePage)**

- Animierte Statistiken mit Counter-Effekt
- Featured Sharks Carousel
- Quick Links zu Filterkategorien
- Hai-Hotspots weltweit
- Hai des Tages
- Fun Facts Rotation

### 2. **Galerie (SharkList)**

- Grid-Layout mit 3 Spalten (responsive)
- Skeleton Loader während des Ladens
- Hover-Effekte mit Bildvergrößerung
- Lazy Loading von Bildern

### 3. **Filter-System (FilterBar)**

- 5 Filter-Kategorien:
  - Alle Haie
  - Top 10 Gefährlichste
  - Top 10 Größte
  - Tiefsee-Haie
  - Filtrierer (Plankton-Fresser)
- Dynamische Count-Badges
- Aktive Status-Anzeige

### 4. **Suchfunktion (SearchBar)**

- Echtzeit-Suche
- Autocomplete-Dropdown
- Debouncing (300ms)
- Highlight von Treffern
- Click-Outside Handling

### 5. **Hai-Vergleichstool (SharkComparison)**

- Auswahl von 2 Haien
- 3 Ansichtsmodi:
  - **Nebeneinander** - Detaillierte SVG-Haie mit Mensch
  - **Überlagert** - Direkte Größenüberlagerung
  - **Gestapelt** - Balkendiagramme für Länge & Gewicht
- Interaktive SVG-Grafiken
- Hover-Tooltips mit Details
- Vergleichstabelle mit Winner-Highlighting

### 6. **Lebensräume (SharkHabitats)**

- 6 weltweite Hai-Hotspots
- Interaktive Karten
- Detailmodal mit Klimainformationen
- Glassmorphism-Design

### 7. **Gefahrenzonen (SharkDangerZones)**

- Weltweite Gefahrenzonen
- Sicherheitsrichtlinien (4 Kategorien)
- Statistiken zu Hai-Angriffen
- Hotspot-Karte

### 8. **Quiz (SharkQuiz)**

- 10 Multiple-Choice Fragen
- Punktesystem
- Sofortiges Feedback
- Ergebnis-Screen mit Bewertung

## 🎯 Design-System

### Farben

```css
/* Primärfarben */
--primary-blue: #0077cc;
--dark-blue: #001a33;
--medium-blue: #003d5c;
--light-blue: #5eb3f6;

/* Akzentfarben */
--danger-red: #ff5733;
--success-green: #4caf50;
```

### Animationen

- Hover-Effekte (Transform, Scale, Shadow)
- Scroll-Animationen
- Loading-States (Skeleton Loaders)
- Smooth Transitions (0.3s ease)

## 🔌 API-Integration

```javascript
// Base URL
const API_URL = "http://localhost:3001";

// Hauptendpoints
GET /sharks/all              // Alle Haie
GET /sharks/:id              // Einzelner Hai
GET /sharks/search?q=...     // Suche
```

## 📱 Responsive Design

```css
/* Mobile */
@media (max-width: 768px) {
  ...;
}

/* Tablet */
@media (max-width: 1024px) {
  ...;
}

/* Desktop */
@media (min-width: 1025px) {
  ...;
}
```

## 🚀 Performance

- Lazy Loading für Bilder
- Debouncing bei Suche (300ms)
- Code Splitting mit React Router
- Optimierte CSS-Selektoren

## 📦 Build & Deployment

```bash
# Production Build
npm run build

# dist/ Ordner wird erstellt
# Deployment auf Vercel, Netlify, etc. möglich
```

---

**Entwickelt mit ❤️ für die Hai-Community 🦈**
