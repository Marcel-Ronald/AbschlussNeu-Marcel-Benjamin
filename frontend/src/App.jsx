import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SharkList from "./components/SharkList";
import OceanBackground from "./components/OceanBackground";
import SharkHabitats from "./components/SharkHabitats";
import SharkDangerZones from "./components/SharkDangerZones";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState("home");

  // Hai-Daten direkt in App.jsx
  const sharks = [
    {
      id: 1,
      name: "Weißer Hai",
      description: "Ein großer Raubhai, der in Küstengewässern vorkommt.",
      image: "/images/sharks/white-shark.avif",
    },
    {
      id: 2,
      name: "Hammerhai",
      description: "Erkennbar an seinem hammerförmigen Kopf.",
      image: "/images/sharks/hammerhai.webp",
    },
    {
      id: 3,
      name: "Tigerhai",
      description:
        "Benannt nach den tigerähnlichen Streifen auf seinem Körper.",
      image: "/images/sharks/tigerhai.jpg",
    },
    {
      id: 4,
      name: "Walhai",
      description: "Die größte bekannte lebende Fischart.",
      image: "/images/sharks/walhai.avif",
    },
    {
      id: 5,
      name: "Blauhai",
      description: "Ein schlanker, anmutiger Hai aus tiefen Gewässern.",
      image: "/images/sharks/blauhai.jpg",
    },
  ];

  const filteredSharks = sharks.filter(
    (shark) =>
      shark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shark.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <li onClick={() => setActivePage("danger-zones")}>Gefahrenzonen</li>
            <li onClick={() => setActivePage("about")}>Über Haie</li>
            <li onClick={() => setActivePage("gallery")}>Galerie</li>
          </ul>
        </div>

        <div className="navbar-right">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </nav>

      {/* Page content */}
      {activePage === "home" && <SharkHabitats />}
      {activePage === "danger-zones" && <SharkDangerZones />}
      {activePage === "about" && (
        <p className="page-text">
          Haie sind für die Gesundheit der Ozeane und das Gleichgewicht der
          Meeresökosysteme unverzichtbar. Sie regulieren Populationen anderer
          Arten, indem sie kranke oder schwache Tiere jagen, und tragen so zur
          Vitalität der Beutetiere bei...
        </p>
      )}
      {activePage === "gallery" && <SharkList sharks={filteredSharks} />}
    </div>
  );
};

export default App;
