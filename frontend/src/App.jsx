import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sharks, setSharks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSharks();
  }, []);

  const fetchAllSharks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/sharks/all");
      const data = await response.json();
      setSharks(data);
    } catch (error) {
      console.error("Fehler beim Laden der Haie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchAllSharks();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/sharks?searchterm=${searchTerm}`
      );
      const data = await response.json();
      setSharks(data);
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🦈 Hai-Wiki</h1>
        <p>Entdecke die faszinierende Welt der Haie</p>
      </header>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Suche nach Haiarten..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Suchen
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              fetchAllSharks();
            }}
            className="reset-button"
          >
            Zurücksetzen
          </button>
        </form>
      </div>

      <main className="main-content">
        {loading ? (
          <div className="loading">Lade Haie...</div>
        ) : sharks.length === 0 ? (
          <div className="no-results">
            <p>Keine Haie gefunden.</p>
            <button onClick={fetchAllSharks} className="reset-button">
              Alle Haie anzeigen
            </button>
          </div>
        ) : (
          <div className="shark-grid">
            {sharks.map((shark) => (
              <div key={shark.id} className="shark-card">
                <div className="shark-emoji">🦈</div>
                <h3>{shark.name}</h3>
                <p className="scientific-name">{shark.scientific_name}</p>
                <div className="shark-stats">
                  <p>📏 Länge: {shark.average_length_m} m</p>
                  <p>⚖️ Gewicht: {shark.average_weight_kg} kg</p>
                  <p>⏳ Lebenserwartung: {shark.lifespan_years} Jahre</p>
                </div>
                {shark.habitat && (
                  <div className="habitat-info">
                    <p>🌊 {shark.habitat.region}</p>
                    <p>🌡️ {shark.habitat.temperature_range}</p>
                  </div>
                )}
                {shark.diet && (
                  <div className="diet-info">
                    <p>🍽️ {shark.diet.diet_type}</p>
                    <p>🐟 {shark.diet.prey_example}</p>
                  </div>
                )}
                <div className={`danger-level danger-${shark.danger_to_humans?.toLowerCase()}`}>
                  ⚠️ Gefahr: {shark.danger_to_humans}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 Hai-Wiki - Dein Portal für Hai-Wissen</p>
        <p>{sharks.length} Haiarten in der Datenbank</p>
      </footer>
    </div>
  );
}

export default App;
