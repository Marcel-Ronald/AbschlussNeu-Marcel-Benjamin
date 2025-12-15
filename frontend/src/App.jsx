import React, { useState, useEffect, useMemo } from "react";
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
import Impressum from "./components/Impressum";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import FilterBar from "./components/FilterBar";
import SharkComparison from "./components/SharkComparison";
import Shark3DViewer from "./components/Shark3DViewer";
import { filterSharks } from "./utils/sharkFilters";
import { useLanguage } from "./context/LanguageContext";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(null);
  const [sharks, setSharks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, toggleLanguage, t } = useLanguage();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lade Hai-Daten vom Backend (nur einmal)
  useEffect(() => {
    const fetchSharks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/sharks/all`);
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Hai-Daten");
        }
        const data = await response.json();
        setSharks(data);
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

  // Formatiere Sharks basierend auf aktueller Sprache (ohne Reload)
  const formattedSharks = useMemo(() => sharks.map((shark) => ({
    id: shark.id,
    name: language === 'en' && shark.name_en ? shark.name_en : shark.name,
    scientific_name: shark.scientific_name,
    average_length_m: parseFloat(shark.average_length_m),
    average_weight_kg: parseFloat(shark.average_weight_kg),
    lifespan_years: parseInt(shark.lifespan_years),
    description: `${shark.scientific_name}. ${language === 'en' && shark.nahrung_en ? shark.nahrung_en : shark.nahrung}. ${language === 'de' ? 'Durchschnittliche Länge' : 'Average length'}: ${shark.average_length_m}m, ${language === 'de' ? 'Gewicht' : 'Weight'}: ${shark.average_weight_kg}kg, ${language === 'de' ? 'Lebensdauer' : 'Lifespan'}: ${shark.lifespan_years} ${language === 'de' ? 'Jahre' : 'years'}.`,
    image: shark.image,
    nahrung: language === 'en' && shark.nahrung_en ? shark.nahrung_en : shark.nahrung,
    gefahr: language === 'en' && shark.gefahr_en ? shark.gefahr_en : shark.gefahr,
    gewohnheiten: language === 'en' && shark.gewohnheiten_en ? shark.gewohnheiten_en : shark.gewohnheiten,
    geburtsort: language === 'en' && shark.geburtsort_en ? shark.geburtsort_en : shark.geburtsort,
  })), [sharks, language]);

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

  // Filtere Haie basierend auf Suchbegriff und Filter
  const filteredSharks = filterSharks(formattedSharks, filterType, searchTerm);

  return (
    <div className="app">
      {/* Animierter Unterwasser-Hintergrund */}
      <OceanBackground />

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-container">
            <h1 className="logo">Shark Wiki 🦈</h1>
            <button
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label={t("Sprache wechseln", "Switch language")}
            >
              {language === "de" ? "🇬🇧 EN" : "🇩🇪 DE"}
            </button>
          </div>
        </div>

        <div className="navbar-center">
          <h2 className="welcome"></h2>
          <ul className="nav-links">
            <li>
              <Link to="/">{t("Startseite", "Home")}</Link>
            </li>
            <li>
              <Link to="/about">{t("Über Haie", "About Sharks")}</Link>
            </li>
            <li>
              <Link to="/habitats">{t("Lebensräume", "Habitats")}</Link>
            </li>
            <li>
              <Link to="/danger-zones">
                {t("Gefahrenzonen", "Danger Zones")}
              </Link>
            </li>
            <li>
              <Link to="/gallery">{t("Galerie", "Gallery")}</Link>
            </li>
            <li>
              <Link to="/comparison">{t("Vergleich", "Comparison")}</Link>
            </li>
            <li>
              <Link to="/3d-viewer">{t("3D Haie", "3D Sharks")}</Link>
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
      {loading && (
        <div className="loading">
          {t("Lade Hai-Daten...", "Loading shark data...")}
        </div>
      )}
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
          <Route path="/comparison" element={<SharkComparison />} />
          <Route path="/3d-viewer" element={<Shark3DViewer />} />
          <Route path="/quiz" element={<SharkQuiz />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
      )}

      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
