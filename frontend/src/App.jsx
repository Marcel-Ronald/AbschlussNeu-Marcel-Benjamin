import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SearchBar from "./components/SearchBar";
import SharkList from "./components/SharkList";
import OceanBackground from "./components/OceanBackground";
import HomePage from "./components/HomePage";
import SharkHabitats from "./components/SharkHabitats";
import SharkDangerZones from "./components/SharkDangerZones";
import SharkDetails from "./components/SharkDetails";
import SharkQuiz from "./components/SharkQuiz";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import FilterBar from "./components/FilterBar";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(null);
  const [sharks, setSharks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lade Hai-Daten vom Backend
  useEffect(() => {
    const fetchSharks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/sharks/all");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Hai-Daten");
        }
        const data = await response.json();
        // Formatiere die Daten für die bestehende Struktur
        const formattedSharks = data.map((shark) => ({
          id: shark.id,
          name: shark.name,
          description: `${shark.scientific_name}. ${shark.nahrung}. Durchschnittliche Länge: ${shark.average_length_m}m, Gewicht: ${shark.average_weight_kg}kg.`,
          image: shark.image,
        }));
        setSharks(formattedSharks);
        setError(null);
      } catch (err) {
        console.error("Fehler beim Laden der Hai-Daten:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharks();
  }, []);

  // Automatisch zur Gallery wechseln wenn etwas gesucht wird
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() !== "") {
      navigate("/gallery");
    }
  };

  // Filter setzen und zur Gallery gehen
  const applyFilter = (filter) => {
    setFilterType(filter);
    setSearchTerm("");
    navigate("/gallery");
  };

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
          <h2 className="welcome"></h2>
          <ul className="nav-links">
            <li>
              <Link to="/">Startseite</Link>
            </li>
            <li>
              <Link to="/about">Über Haie</Link>
            </li>
            <li>
              <Link to="/habitats">Lebensräume</Link>
            </li>
            <li>
              <Link to="/danger-zones">Gefahrenzonen</Link>
            </li>
            <li>
              <Link to="/gallery">Galerie</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
        </div>
      </nav>

      {/* Fehler- und Ladestatus */}
      {loading && <div className="loading">Lade Hai-Daten...</div>}
      {error && <div className="error">{error}</div>}

      {/* Routes */}
      {!loading && !error && (
        <Routes>
          <Route
            path="/"
            element={<HomePage sharks={sharks} applyFilter={applyFilter} />}
          />
          <Route path="/habitats" element={<SharkHabitats />} />
          <Route path="/danger-zones" element={<SharkDangerZones />} />
          <Route path="/about" element={<SharkDetails />} />
          <Route
            path="/gallery"
            element={
              <>
                <FilterBar
                  sharks={sharks}
                  filterType={filterType}
                  onFilterChange={setFilterType}
                />
                <SharkList sharks={filteredSharks} loading={loading} />
              </>
            }
          />
          <Route path="/quiz" element={<SharkQuiz />} />
        </Routes>
      )}

      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
