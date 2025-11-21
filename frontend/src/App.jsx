import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SharkList from "./components/SharkList";
import OceanBackground from "./components/OceanBackground";
import HomePage from "./components/HomePage";
import SharkHabitats from "./components/SharkHabitats";
import SharkDangerZones from "./components/SharkDangerZones";
import SharkDetails from "./components/SharkDetails";
import SharkQuiz from "./components/SharkQuiz";
import Footer from "./components/Footer";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [filterType, setFilterType] = useState(null);

  // Automatisch zur Gallery wechseln wenn etwas gesucht wird
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() !== "") {
      setActivePage("gallery");
    }
  };

  // Filter setzen und zur Gallery gehen
  const applyFilter = (filter) => {
    setFilterType(filter);
    setSearchTerm("");
    setActivePage("gallery");
  };

  // Hai-Daten direkt in App.jsx
  const sharks = [
    {
      id: 1,
      name: "Weißer Hai",
      description:
        "Ein großer Raubhai, der in Küstengewässern vorkommt. Durchschnittliche Länge: 4.5m, Gewicht: 1000kg.",
      image: "/images/sharks/white-shark.avif",
    },
    {
      id: 2,
      name: "Hammerhai",
      description:
        "Erkennbar an seinem hammerförmigen Kopf. Durchschnittliche Länge: 4.0m, Gewicht: 450kg.",
      image: "/images/sharks/hammerhai.webp",
    },
    {
      id: 3,
      name: "Tigerhai",
      description:
        "Benannt nach den tigerähnlichen Streifen auf seinem Körper. Durchschnittliche Länge: 3.8m, Gewicht: 600kg.",
      image: "/images/sharks/tigerhai.jpg",
    },
    {
      id: 4,
      name: "Walhai",
      description:
        "Die größte bekannte lebende Fischart. Durchschnittliche Länge: 12.0m, Gewicht: 18000kg.",
      image: "/images/sharks/walhai.avif",
    },
    {
      id: 5,
      name: "Blauhai",
      description:
        "Ein schlanker, anmutiger Hai aus tiefen Gewässern. Durchschnittliche Länge: 3.0m, Gewicht: 200kg.",
      image: "/images/sharks/blauhai.jpg",
    },
    {
      id: 6,
      name: "Grönlandhai",
      description:
        "Einer der langlebigsten Haie, kann über 400 Jahre alt werden. Durchschnittliche Länge: 5.0m, Gewicht: 1000kg.",
      image: "/images/sharks/Grönlandhai.jpg",
    },
    {
      id: 7,
      name: "Weißspitzen-Riffhai",
      description:
        "Kleiner Riffhai mit charakteristischen weißen Flossenspitzen. Durchschnittliche Länge: 1.6m, Gewicht: 18kg.",
      image: "/images/sharks/Weißspitzen-Riffhai.jpg",
    },
    {
      id: 8,
      name: "Kurzflossen-Mako",
      description:
        "Einer der schnellsten Haie, kann Geschwindigkeiten bis 60 km/h erreichen. Durchschnittliche Länge: 3.2m, Gewicht: 300kg.",
      image: "/images/sharks/Kurzflossen-Mako.jpg",
    },
    {
      id: 9,
      name: "Bullenhai",
      description:
        "Kann sowohl in Salz- als auch in Süßwasser leben. Durchschnittliche Länge: 2.5m, Gewicht: 230kg.",
      image: "/images/sharks/Bullenhai.jpg",
    },
    {
      id: 10,
      name: "Zitronenhai",
      description:
        "Benannt nach seiner gelblich-braunen Färbung. Durchschnittliche Länge: 3.0m, Gewicht: 180kg.",
      image: "/images/sharks/Zitronenhai.jpg",
    },
    {
      id: 11,
      name: "Riesenhai",
      description:
        "Zweitgrößter Hai der Welt, ernährt sich von Plankton. Durchschnittliche Länge: 8.5m, Gewicht: 4000kg.",
      image: "/images/sharks/Riesenhai.jpg",
    },
    {
      id: 12,
      name: "Schwarzspitzen-Riffhai",
      description:
        "Kleiner, aktiver Riffhai mit schwarzen Flossenspitzen. Durchschnittliche Länge: 1.6m, Gewicht: 20kg.",
      image: "/images/sharks/Schwarzspitzen-Riffhai.jpg",
    },
    {
      id: 13,
      name: "Sandtigerhai",
      description:
        "Trotz seines Namens und Aussehens relativ friedlich. Durchschnittliche Länge: 3.2m, Gewicht: 160kg.",
      image: "/images/sharks/Sandtigerhai.jpg",
    },
    {
      id: 14,
      name: "Fuchshai",
      description:
        "Bekannt für seine extrem lange Schwanzflosse. Durchschnittliche Länge: 4.5m, Gewicht: 350kg.",
      image: "/images/sharks/Fuchshai.jpg",
    },
    {
      id: 15,
      name: "Seidenhai",
      description:
        "Hochseehai mit glatter, seidenartiger Haut. Durchschnittliche Länge: 2.5m, Gewicht: 85kg.",
      image: "/images/sharks/Seidenhai.jpg",
    },
    {
      id: 16,
      name: "Engelhai",
      description:
        "Flach geformter Grundhai, ähnelt einem Rochen. Durchschnittliche Länge: 1.8m, Gewicht: 35kg.",
      image: "/images/sharks/Engelhai.jpg",
    },
    {
      id: 17,
      name: "Grauer Riffhai",
      description:
        "Häufiger Riffbewohner in tropischen Gewässern. Durchschnittliche Länge: 1.9m, Gewicht: 30kg.",
      image: "/images/sharks/Grauer Riffhai.jpg",
    },
    {
      id: 18,
      name: "Langflossen-Mako",
      description:
        "Größer als sein Verwandter, der Kurzflossen-Mako. Durchschnittliche Länge: 3.7m, Gewicht: 170kg.",
      image: "/images/sharks/Langflossen-Mako.jpg",
    },
    {
      id: 19,
      name: "Sechskiemer-Hai",
      description:
        "Primitiver Tiefseehai mit sechs Kiemenspalten. Durchschnittliche Länge: 4.8m, Gewicht: 590kg.",
      image: "/images/sharks/Sechskiemer-Hai.jpg",
    },
    {
      id: 20,
      name: "Katzenhai",
      description:
        "Kleiner, harmloser Grundhai. Durchschnittliche Länge: 0.8m, Gewicht: 2kg.",
      image: "/images/sharks/Katzenhai.jpg",
    },
    {
      id: 21,
      name: "Hornhai",
      description:
        "Kleiner Hai mit hornartigen Augenbrauenkämmen. Länge: 1.2m, Gewicht: 10kg, Lebenserwartung: 25 Jahre",
      image: "/images/sharks/Hornhai.jpg",
    },
    {
      id: 22,
      name: "Galapagos-Hai",
      description:
        "Bewohnt die Gewässer um Galapagos. Länge: 3.0m, Gewicht: 85kg, Lebenserwartung: 24 Jahre",
      image: "/images/sharks/Galapagos-Hai.jpeg",
    },
    {
      id: 23,
      name: "Bronzehai",
      description:
        "Großer Küstenhai. Länge: 3.0m, Gewicht: 200kg, Lebenserwartung: 30 Jahre",
      image: "/images/sharks/Bronzehai.jpg",
    },
    {
      id: 24,
      name: "Blaugrauer Hai",
      description:
        "Auch Sandbarhai genannt. Länge: 2.5m, Gewicht: 120kg, Lebenserwartung: 35 Jahre",
      image: "/images/sharks/Blaugrauer Hai.jpg",
    },
    {
      id: 25,
      name: "Schwarzhai",
      description:
        "Hochseehai mit dunkler Färbung. Länge: 3.6m, Gewicht: 180kg, Lebenserwartung: 45 Jahre",
      image: "/images/sharks/Schwarzhai.jpg",
    },
    {
      id: 26,
      name: "Nachthai",
      description:
        "Tiefseehai, nachtaktiv. Länge: 2.8m, Gewicht: 75kg, Lebenserwartung: 20 Jahre",
      image: "/images/sharks/Nachthai.jpg",
    },
    {
      id: 27,
      name: "Weißspitzen-Hochseehai",
      description:
        "Gefährlicher Hochseehai. Länge: 3.0m, Gewicht: 170kg, Lebenserwartung: 22 Jahre",
      image: "/images/sharks/Weißspitzen-Hochseehai.jpg",
    },
    {
      id: 28,
      name: "Koboldhai",
      description:
        "Seltener Tiefseehai mit auffälliger Schnauze. Länge: 3.8m, Gewicht: 210kg, Lebenserwartung: 60 Jahre",
      image: "/images/sharks/Koboldhai.jpg",
    },
    {
      id: 29,
      name: "Riesenmaul-Hai",
      description:
        "Seltener Planktonfresser. Länge: 5.5m, Gewicht: 1200kg, Lebenserwartung: 100 Jahre",
      image: "/images/sharks/Riesenmaul-Hai.jpeg",
    },
    {
      id: 30,
      name: "Dornhai",
      description:
        "Kleiner Hai mit Stacheln. Länge: 1.2m, Gewicht: 7kg, Lebenserwartung: 100 Jahre",
      image: "/images/sharks/Dornhai.jpg",
    },
    {
      id: 31,
      name: "Pazifischer Schlafhai",
      description:
        "Langsamer Tiefseehai. Länge: 4.3m, Gewicht: 350kg, Lebenserwartung: 200 Jahre",
      image: "/images/sharks/Pazifischer Schlafhai.jpg",
    },
    {
      id: 32,
      name: "Laternhai",
      description:
        "Winziger biolumineszenter Hai. Länge: 0.5m, Gewicht: 0.5kg, Lebenserwartung: 20 Jahre",
      image: "/images/sharks/Laternhai.jpeg",
    },
    {
      id: 33,
      name: "Zittern-Hai",
      description:
        "Mittelgroßer Küstenhai. Länge: 2.1m, Gewicht: 45kg, Lebenserwartung: 18 Jahre",
      image: "/images/sharks/Zittern-Hai.jpg",
    },
    {
      id: 34,
      name: "Karibischer Riffhai",
      description:
        "Typischer Karibik-Riffbewohner. Länge: 2.5m, Gewicht: 70kg, Lebenserwartung: 22 Jahre",
      image: "/images/sharks/Karibischer Riffhai.jpg",
    },
    {
      id: 35,
      name: "Australischer Schwarzspitzenhai",
      description:
        "Kleiner australischer Küstenhai. Länge: 1.8m, Gewicht: 35kg, Lebenserwartung: 15 Jahre",
      image: "/images/sharks/Australischer Schwarzspitzenhai.jpg",
    },
    {
      id: 36,
      name: "Spinner-Hai",
      description:
        "Bekannt für spektakuläre Sprünge. Länge: 2.4m, Gewicht: 90kg, Lebenserwartung: 25 Jahre",
      image: "/images/sharks/Spinner-Hai.jpeg",
    },
    {
      id: 37,
      name: "Atlantischer Scherbenhai",
      description:
        "Kleiner Atlantikhai. Länge: 1.5m, Gewicht: 20kg, Lebenserwartung: 18 Jahre",
      image: "/images/sharks/Atlantischer Scherbenhai.jpeg",
    },
    {
      id: 38,
      name: "Borneo-Hai",
      description:
        "Sehr kleiner, seltener Hai. Länge: 0.7m, Gewicht: 3kg, Lebenserwartung: 10 Jahre",
      image: "/images/sharks/Borneo-Hai.jpeg",
    },
    {
      id: 39,
      name: "Fleckhai",
      description:
        "Kleiner gefleckter Hai. Länge: 1.6m, Gewicht: 20kg, Lebenserwartung: 13 Jahre",
      image: "/images/sharks/Fleckhai.jpg",
    },
    {
      id: 40,
      name: "Pazifischer Engelhai",
      description:
        "Flacher Pazifik-Bewohner. Länge: 1.5m, Gewicht: 27kg, Lebenserwartung: 35 Jahre",
      image: "/images/sharks/Pazifischer Engelhai.jpg",
    },
    {
      id: 41,
      name: "Japanischer Teppichhai",
      description:
        "Bodenbewohnender Tarnungskünstler. Länge: 1.0m, Gewicht: 15kg, Lebenserwartung: 25 Jahre",
      image: "/images/sharks/Japanischer Teppichhai.jpeg",
    },
    {
      id: 42,
      name: "Zebrahai",
      description:
        "Gestreifter Riffhai. Länge: 2.5m, Gewicht: 30kg, Lebenserwartung: 28 Jahre",
      image: "/images/sharks/Zebrahai.jpg",
    },
    {
      id: 43,
      name: "Ammenhai",
      description:
        "Friedlicher Bodenbewohner. Länge: 2.7m, Gewicht: 110kg, Lebenserwartung: 25 Jahre",
      image: "/images/sharks/Ammenhai.jpg",
    },
    {
      id: 44,
      name: "Bambushai",
      description:
        "Kleiner, schlanker Riffhai. Länge: 1.0m, Gewicht: 10kg, Lebenserwartung: 25 Jahre",
      image: "/images/sharks/Bambushai.jpeg",
    },
    {
      id: 45,
      name: "Sägerochen",
      description:
        "Hai mit sägeartiger Schnauze. Länge: 5.5m, Gewicht: 350kg, Lebenserwartung: 30 Jahre",
      image: "/images/sharks/Sägerochen.jpg",
    },
    {
      id: 46,
      name: "Kragenhai",
      description:
        "Urzeit-Hai mit aalähnlichem Körper. Länge: 2.0m, Gewicht: 50kg, Lebenserwartung: 25 Jahre",
      image: "/images/sharks/Kragenhai.jpeg",
    },
    {
      id: 47,
      name: "Megamaul-Hai",
      description:
        "Kleiner Tiefseehai. Länge: 1.2m, Gewicht: 8kg, Lebenserwartung: 15 Jahre",
      image: "/images/sharks/Megamaul-Hai.jpeg",
    },
    {
      id: 48,
      name: "Grönland-Eishai",
      description:
        "Extremer Langlebigkeitsrekord. Länge: 6.4m, Gewicht: 1400kg, Lebenserwartung: 500 Jahre",
      image: "/images/sharks/Grönland-Eishai.jpeg",
    },
  ];

  // Top 10 gefährlichste Haie basierend auf Beschreibung
  const dangerousSharkNames = [
    "Weißer Hai",
    "Tigerhai",
    "Bullenhai",
    "Weißspitzen-Hochseehai",
    "Galapagos-Hai",
    "Grauer Riffhai",
    "Hammerhai",
    "Kurzflossen-Mako",
    "Bronzehai",
    "Schwarzspitzen-Riffhai",
  ];

  // Filtere Haie basierend auf Suchbegriff und Filter
  let filteredSharks = sharks;

  if (searchTerm) {
    filteredSharks = filteredSharks.filter(
      (shark) =>
        shark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shark.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterType === "dangerous") {
    filteredSharks = sharks
      .filter((shark) => dangerousSharkNames.includes(shark.name))
      .slice(0, 10);
  } else if (filterType === "large") {
    filteredSharks = [...sharks]
      .sort((a, b) => {
        const sizeA = parseFloat(
          a.description.match(/(\d+\.?\d*)\s*m/)?.[1] || 0
        );
        const sizeB = parseFloat(
          b.description.match(/(\d+\.?\d*)\s*m/)?.[1] || 0
        );
        return sizeB - sizeA;
      })
      .slice(0, 10);
  } else if (filterType === "deep") {
    filteredSharks = sharks.filter(
      (shark) =>
        shark.description.toLowerCase().includes("tiefsee") ||
        shark.name.includes("Koboldhai") ||
        shark.name.includes("Laternhai") ||
        shark.name.includes("Sechskiemer") ||
        shark.name.includes("Riesenmaul")
    );
  } else if (filterType === "filter") {
    filteredSharks = sharks.filter(
      (shark) =>
        shark.name.includes("Walhai") ||
        shark.name.includes("Riesenhai") ||
        shark.name.includes("Riesenmaul")
    );
  }

  return (
    <div className="app">
      {/* Animierter Unterwasser-Hintergrund */}
      <OceanBackground />

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo">Shark Wiki 🦈</h1>
        </div>

        <div className="navbar-center">
          <h2 className="welcome">Willkommen im Hai Wiki</h2>
          <ul className="nav-links">
            <li onClick={() => setActivePage("home")}>Startseite</li>
            <li onClick={() => setActivePage("habitats")}>Lebensräume</li>
            <li onClick={() => setActivePage("danger-zones")}>Gefahrenzonen</li>
            <li onClick={() => setActivePage("about")}>Über Haie</li>
            <li onClick={() => setActivePage("gallery")}>Galerie</li>
            <li onClick={() => setActivePage("quiz")}>Quiz</li>
          </ul>
        </div>

        <div className="navbar-right">
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
        </div>
      </nav>

      {/* Page content */}
      {activePage === "home" && (
        <HomePage
          setActivePage={setActivePage}
          sharks={sharks}
          applyFilter={applyFilter}
        />
      )}
      {activePage === "habitats" && <SharkHabitats />}
      {activePage === "danger-zones" && <SharkDangerZones />}
      {activePage === "about" && <SharkDetails />}
      {activePage === "gallery" && <SharkList sharks={filteredSharks} />}
      {activePage === "quiz" && <SharkQuiz />}

      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default App;
