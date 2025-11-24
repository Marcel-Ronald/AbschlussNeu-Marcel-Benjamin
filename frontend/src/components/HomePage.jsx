import React, { useState, useEffect } from "react";

const HomePage = ({ setActivePage, sharks, applyFilter }) => {
  const [sharkOfTheDay, setSharkOfTheDay] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const facts = [
    "Haie existieren seit über 450 Millionen Jahren - älter als Bäume!",
    "Der Grönlandhai kann über 500 Jahre alt werden",
    "Walhaie sind die größten Fische der Welt und können bis zu 18 Meter lang werden",
    "Haie haben keine Knochen - ihr Skelett besteht komplett aus Knorpel",
    "Der Kurzflossen-Mako ist der schnellste Hai und erreicht bis zu 60 km/h",
    "Haie verlieren in ihrem Leben über 30.000 Zähne",
    "Der Hammerhai nutzt seinen Kopf als Sensor zum Aufspüren von Beute",
    "Nur etwa 12 Haiarten gelten als potenziell gefährlich für Menschen",
  ];

  const statistics = [
    { number: "48", label: "Haiarten in unserer Datenbank" },
    { number: "450M", label: "Jahre Evolution" },
    { number: "500+", label: "Haiarten weltweit" },
    { number: "12", label: "Potentiell gefährliche Arten" },
  ];

  const popularSearches = [
    "Weißer Hai",
    "Hammerhai",
    "Walhai",
    "Tigerhai",
    "Grönlandhai",
    "Megalodon",
  ];

  const featuredSharks = [
    {
      name: "Weißer Hai",
      image: "/images/sharks/white-shark.avif",
      fact: "Größter Raubfisch",
      danger: "Hoch",
    },
    {
      name: "Walhai",
      image: "/images/sharks/walhai.avif",
      fact: "Größter Fisch der Welt",
      danger: "Keine",
    },
    {
      name: "Grönlandhai",
      image: "/images/sharks/Grönlandhai.jpg",
      fact: "Ältestes Wirbeltier",
      danger: "Sehr gering",
    },
    {
      name: "Hammerhai",
      image: "/images/sharks/hammerhai.webp",
      fact: "Einzigartiger Kopf",
      danger: "Mittel",
    },
  ];

  const quickLinks = [
    { title: "Top 10 Gefährlichste", filter: "dangerous", icon: "⚠️" },
    { title: "Größte Haie", filter: "large", icon: "📏" },
    { title: "Tiefsee-Haie", filter: "deep", icon: "🌊" },
    { title: "Filtrierer", filter: "filter", icon: "🍽️" },
  ];

  const hotspots = [
    {
      id: 1,
      name: "Great Barrier Reef",
      location: "Australien",
      description:
        "Heimat verschiedener Haiarten, einschließlich Riffhaie und Walhaie. Das größte Korallenriffsystem der Welt bietet perfekte Bedingungen für über 50 Haiarten.",
      sharks: "Riffhaie, Walhaie, Weißspitzen-Riffhai, Schwarzspitzen-Riffhai",
    },
    {
      id: 2,
      name: "Galapagos",
      location: "Ecuador",
      description:
        "Berühmt für Hammerhai-Schulen und Walhaie. Die einzigartige Lage ermöglicht Begegnungen mit seltenen und gefährdeten Haiarten.",
      sharks: "Hammerhaie, Walhaie, Galapagos-Hai, Seidenhai",
    },
    {
      id: 3,
      name: "Südafrika",
      location: "Küste von Kapstadt",
      description:
        "Bekannt für Weiße Haie und vielfältiges Meeresleben. Besonders False Bay ist ein Hotspot für Hai-Beobachtungen.",
      sharks: "Weiße Haie, Tigerhaie, Bullenhaie, Bronzehai",
    },
    {
      id: 4,
      name: "Malediven",
      location: "Indischer Ozean",
      description:
        "Kristallklare Gewässer, Heimat von Walhaien und Riffhaien. Ganzjährige Hai-Sichtungen in den zahlreichen Atollen.",
      sharks: "Walhaie, Weißspitzen-Riffhai, Grauer Riffhai",
    },
    {
      id: 5,
      name: "Bahamas",
      location: "Karibik",
      description:
        "Tigerhaie und Karibische Riffhaie gedeihen hier. Bekannt für Hai-Tauchen und kristallklares Wasser.",
      sharks: "Tigerhaie, Karibischer Riffhai, Zitronenhai, Hammerhai",
    },
  ];

  useEffect(() => {
    // Zufälligen Hai des Tages auswählen
    if (sharks && sharks.length > 0) {
      const randomIndex = Math.floor(Math.random() * sharks.length);
      setSharkOfTheDay(sharks[randomIndex]);
    }

    // Fakten rotieren
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 5000);

    return () => clearInterval(factInterval);
  }, [sharks]);

  const handleQuickLink = (filter) => {
    applyFilter(filter);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Willkommen im Hai-Wiki</h1>
          <p className="hero-subtitle">
            Entdecke die faszinierende Welt der Haie - von den Tiefen der Ozeane
            bis zu den Küstengewässern
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => setActivePage("gallery")}
            >
              Alle Haie entdecken
            </button>
            <button
              className="btn-secondary"
              onClick={() => setActivePage("about")}
            >
              Mehr erfahren
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="stats-grid">
          {statistics.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="fact-section">
        <div className="fact-card">
          <h2 className="fact-title">💡 Wusstest du?</h2>
          <p className="fact-text">{facts[currentFactIndex]}</p>
          <div className="fact-indicators">
            {facts.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentFactIndex ? "active" : ""
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Shark of the Day */}
      {sharkOfTheDay && (
        <section className="shark-of-day-section">
          <h2 className="section-title">🦈 Hai des Tages</h2>
          <div className="shark-of-day-card">
            <img
              src={sharkOfTheDay.image}
              alt={sharkOfTheDay.name}
              className="shark-of-day-image"
            />
            <div className="shark-of-day-content">
              <h3>{sharkOfTheDay.name}</h3>
              <p>{sharkOfTheDay.description}</p>
              <button
                className="btn-learn-more"
                onClick={() => setActivePage("about")}
              >
                Mehr erfahren →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Sharks */}
      <section className="featured-section">
        <h2 className="section-title">⭐ Besondere Haie</h2>
        <div className="featured-grid">
          {featuredSharks.map((shark, index) => (
            <div
              key={index}
              className="featured-card"
              onClick={() => setActivePage("gallery")}
            >
              <img
                src={shark.image}
                alt={shark.name}
                className="featured-image"
              />
              <div className="featured-content">
                <h3>{shark.name}</h3>
                <p className="featured-fact">{shark.fact}</p>
                <span
                  className={`danger-badge ${shark.danger
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {shark.danger}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links-section">
        <h2 className="section-title">🔍 Schnellzugriff</h2>
        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="quick-link-card"
              onClick={() => handleQuickLink(link.filter)}
            >
              <span className="quick-link-icon">{link.icon}</span>
              <span className="quick-link-title">{link.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Searches */}
      <section className="popular-searches-section">
        <h2 className="section-title">🔥 Beliebte Suchen</h2>
        <div className="search-tags">
          {popularSearches.map((search, index) => (
            <span
              key={index}
              className="search-tag"
              onClick={() => setActivePage("gallery")}
            >
              {search}
            </span>
          ))}
        </div>
      </section>

      {/* World Map Hotspots */}
      <section className="map-section">
        <h2 className="section-title">🗺️ Hai-Hotspots Weltweit</h2>
        <div className="map-card">
          <div className="map-placeholder">
            {hotspots.map((hotspot, index) => (
              <div
                key={hotspot.id}
                className={`hotspot hotspot-${index + 1}`}
                onClick={() =>
                  setSelectedHotspot(
                    selectedHotspot === hotspot.id ? null : hotspot.id
                  )
                }
              >
                <span className="hotspot-dot"></span>
                <span className="hotspot-label">{hotspot.name}</span>
              </div>
            ))}
          </div>

          {selectedHotspot ? (
            <div className="hotspot-info">
              {hotspots
                .filter((h) => h.id === selectedHotspot)
                .map((hotspot) => (
                  <div key={hotspot.id} className="hotspot-details">
                    <h3>
                      {hotspot.name}, {hotspot.location}
                    </h3>
                    <p className="hotspot-description">{hotspot.description}</p>
                    <div className="hotspot-sharks">
                      <strong>Haiarten:</strong> {hotspot.sharks}
                    </div>
                    <button
                      className="btn-explore-habitat"
                      onClick={() => setActivePage("habitats")}
                    >
                      Lebensräume erkunden →
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="map-description">
              Klicke auf die Punkte, um mehr über die wichtigsten Hai-Habitate
              zu erfahren
            </p>
          )}
        </div>
      </section>

      {/* Quiz Teaser */}
      <section className="quiz-section">
        <div className="quiz-card">
          <h2 className="quiz-title">🎯 Teste dein Wissen!</h2>
          <p className="quiz-description">
            Kannst du verschiedene Haiarten identifizieren? Nimm an unserem Quiz
            teil!
          </p>
          <button className="btn-quiz" onClick={() => setActivePage("quiz")}>
            Quiz starten
          </button>
        </div>
      </section>

      {/* Latest News/Blog Teaser */}
      <section className="news-section">
        <h2 className="section-title">📰 Neuigkeiten</h2>
        <div className="news-grid">
          <div className="news-card">
            <h3>Neue Haiart entdeckt</h3>
            <p className="news-date">15. November 2025</p>
            <p>
              Forscher entdecken neue Tiefsee-Haiart vor der Küste Japans...
            </p>
          </div>
          <div className="news-card">
            <h3>Haischutz-Initiative</h3>
            <p className="news-date">10. November 2025</p>
            <p>
              Internationales Abkommen zum Schutz bedrohter Haiarten
              unterzeichnet...
            </p>
          </div>
          <div className="news-card">
            <h3>Grönlandhai-Forschung</h3>
            <p className="news-date">5. November 2025</p>
            <p>Neue Erkenntnisse über das extreme Alter der Grönlandhaie...</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Bereit, die Welt der Haie zu entdecken?</h2>
          <p>
            Tauche ein in unsere umfangreiche Datenbank mit 48 faszinierenden
            Haiarten
          </p>
          <button className="btn-cta" onClick={() => setActivePage("gallery")}>
            Jetzt entdecken →
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
