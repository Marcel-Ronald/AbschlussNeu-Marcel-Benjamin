import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const HomePage = ({ sharks, applyFilter }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [sharkOfTheDay, setSharkOfTheDay] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  const facts =
    language === "de"
      ? [
          "Haie existieren seit über 450 Millionen Jahren - älter als Bäume!",
          "Der Grönlandhai kann über 500 Jahre alt werden",
          "Walhaie sind die größten Fische der Welt und können bis zu 18 Meter lang werden",
          "Haie haben keine Knochen - ihr Skelett besteht komplett aus Knorpel",
          "Der Kurzflossen-Mako ist der schnellste Hai und erreicht bis zu 60 km/h",
          "Haie verlieren in ihrem Leben über 30.000 Zähne",
          "Der Hammerhai nutzt seinen Kopf als Sensor zum Aufspüren von Beute",
          "Nur etwa 12 Haiarten gelten als potenziell gefährlich für Menschen",
        ]
      : [
          "Sharks have existed for over 450 million years - older than trees!",
          "The Greenland shark can live for over 500 years",
          "Whale sharks are the largest fish in the world and can grow up to 18 meters long",
          "Sharks have no bones - their skeleton is made entirely of cartilage",
          "The shortfin mako is the fastest shark and reaches up to 60 km/h",
          "Sharks lose over 30,000 teeth in their lifetime",
          "The hammerhead uses its head as a sensor to locate prey",
          "Only about 12 shark species are considered potentially dangerous to humans",
        ];

  const statistics = [
    {
      number: 50,
      label: t(
        "Haiarten in unserer Datenbank",
        "Shark species in our database"
      ),
      suffix: "",
    },
    {
      number: 450,
      label: t("Jahre Evolution", "Million years of evolution"),
      suffix: "M",
    },
    {
      number: 500,
      label: t("Haiarten weltweit", "Shark species worldwide"),
      suffix: "+",
    },
    {
      number: 12,
      label: t("Potentiell gefährliche Arten", "Potentially dangerous species"),
      suffix: "",
    },
  ];

  const popularSearches =
    language === "de"
      ? [
          "Weißer Hai",
          "Hammerhai",
          "Walhai",
          "Tigerhai",
          "Grönlandhai",
          "Megalodon",
        ]
      : [
          "Great White Shark",
          "Hammerhead",
          "Whale Shark",
          "Tiger Shark",
          "Greenland Shark",
          "Megalodon",
        ];

  const featuredSharks =
    language === "de"
      ? [
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
        ]
      : [
          {
            name: "Great White Shark",
            image: "/images/sharks/white-shark.avif",
            fact: "Largest predatory fish",
            danger: "High",
          },
          {
            name: "Whale Shark",
            image: "/images/sharks/walhai.avif",
            fact: "Largest fish in the world",
            danger: "None",
          },
          {
            name: "Greenland Shark",
            image: "/images/sharks/Grönlandhai.jpg",
            fact: "Oldest vertebrate",
            danger: "Very low",
          },
          {
            name: "Hammerhead",
            image: "/images/sharks/hammerhai.webp",
            fact: "Unique head shape",
            danger: "Medium",
          },
        ];

  const quickLinks =
    language === "de"
      ? [
          { title: "Top 10 Gefährlichste", filter: "dangerous", icon: "⚠️" },
          { title: "Größte Haie", filter: "large", icon: "📏" },
          { title: "Tiefsee-Haie", filter: "deep", icon: "🌊" },
          { title: "Filtrierer", filter: "filter", icon: "🍽️" },
        ]
      : [
          { title: "Top 10 Most Dangerous", filter: "dangerous", icon: "⚠️" },
          { title: "Largest Sharks", filter: "large", icon: "📏" },
          { title: "Deep Sea Sharks", filter: "deep", icon: "🌊" },
          { title: "Filter Feeders", filter: "filter", icon: "🍽️" },
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

  // Animated counter effect for statistics
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    statistics.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(
          Math.floor(increment * currentStep),
          stat.number
        );

        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = newValue;
          return newStats;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  const handleQuickLink = (filter) => {
    applyFilter(filter);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{t("Willkommen", "Welcome")}</h1>
          <p className="hero-subtitle">
            {t(
              "Entdecke die faszinierende Welt der Haie - von den Tiefen der Ozeane bis zu den Küstengewässern",
              "Discover the fascinating world of sharks - from the depths of the oceans to coastal waters"
            )}
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/gallery")}
            >
              {t("Alle Haie entdecken", "Discover all sharks")}
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/about")}
            >
              {t("Mehr erfahren", "Learn more")}
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="stats-grid">
          {statistics.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">
                {animatedStats[index]}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="fact-section">
        <div className="fact-card">
          <h2 className="fact-title">
            💡 {t("Wusstest du?", "Did you know?")}
          </h2>
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
          <h2 className="section-title">
            🦈 {t("Hai des Tages", "Shark of the Day")}
          </h2>
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
                onClick={() => navigate("/about")}
              >
                {t("Mehr erfahren", "Learn more")} →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Sharks */}
      <section className="featured-section">
        <h2 className="section-title">
          ⭐ {t("Besondere Haie", "Featured Sharks")}
        </h2>
        <div className="featured-grid">
          {featuredSharks.map((shark, index) => (
            <div
              key={index}
              className="featured-card"
              onClick={() => navigate("/gallery")}
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
        <h2 className="section-title">
          🔍 {t("Schnellzugriff", "Quick Access")}
        </h2>
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
        <h2 className="section-title">
          🔥 {t("Beliebte Suchen", "Popular Searches")}
        </h2>
        <div className="search-tags">
          {popularSearches.map((search, index) => (
            <span
              key={index}
              className="search-tag"
              onClick={() => navigate("/gallery")}
            >
              {search}
            </span>
          ))}
        </div>
      </section>

      {/* World Map Hotspots */}
      <section className="map-section">
        <h2 className="section-title">
          🗺️ {t("Hai-Hotspots Weltweit", "Shark Hotspots Worldwide")}
        </h2>
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
                      <strong>{t("Haiarten:", "Shark species:")} </strong>{" "}
                      {hotspot.sharks}
                    </div>
                    <button
                      className="btn-explore-habitat"
                      onClick={() => navigate("/habitats")}
                    >
                      {t("Lebensräume erkunden", "Explore habitats")} →
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="map-description">
              {t(
                "Klicke auf die Punkte, um mehr über die wichtigsten Hai-Habitate zu erfahren",
                "Click on the points to learn more about the most important shark habitats"
              )}
            </p>
          )}
        </div>
      </section>

      {/* Quiz Teaser */}
      <section className="quiz-section">
        <div className="quiz-card">
          <h2 className="quiz-title">
            🎯 {t("Teste dein Wissen!", "Test your knowledge!")}
          </h2>
          <p className="quiz-description">
            {t(
              "Kannst du verschiedene Haiarten identifizieren? Nimm an unserem Quiz teil!",
              "Can you identify different shark species? Take our quiz!"
            )}
          </p>
          <button className="btn-quiz" onClick={() => navigate("/quiz")}>
            {t("Quiz starten", "Start Quiz")}
          </button>
        </div>
      </section>

      {/* Latest News/Blog Teaser */}
      <section className="news-section">
        <h2 className="section-title">📰 {t("Neuigkeiten", "News")}</h2>
        <div className="news-grid">
          <div className="news-card">
            <h3>{t("Neue Haiart entdeckt", "New Shark Species Discovered")}</h3>
            <p className="news-date">
              {t("15. November 2025", "November 15, 2025")}
            </p>
            <p>
              {t(
                "Forscher entdecken neue Tiefsee-Haiart vor der Küste Japans...",
                "Researchers discover new deep-sea shark species off the coast of Japan..."
              )}
            </p>
          </div>
          <div className="news-card">
            <h3>
              {t("Haischutz-Initiative", "Shark Conservation Initiative")}
            </h3>
            <p className="news-date">
              {t("10. November 2025", "November 10, 2025")}
            </p>
            <p>
              {t(
                "Internationales Abkommen zum Schutz bedrohter Haiarten unterzeichnet...",
                "International agreement signed to protect endangered shark species..."
              )}
            </p>
          </div>
          <div className="news-card">
            <h3>{t("Grönlandhai-Forschung", "Greenland Shark Research")}</h3>
            <p className="news-date">
              {t("5. November 2025", "November 5, 2025")}
            </p>
            <p>
              {t(
                "Neue Erkenntnisse über das extreme Alter der Grönlandhaie...",
                "New insights into the extreme age of Greenland sharks..."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>
            {t(
              "Bereit, die Welt der Haie zu entdecken?",
              "Ready to discover the world of sharks?"
            )}
          </h2>
          <p>
            {t(
              "Tauche ein in unsere umfangreiche Datenbank mit 50 faszinierenden Haiarten",
              "Dive into our comprehensive database with 50 fascinating shark species"
            )}
          </p>
          <button className="btn-cta" onClick={() => navigate("/gallery")}>
            {t("Jetzt entdecken", "Discover now")} →
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
