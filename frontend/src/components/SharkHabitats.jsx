import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const SharkHabitats = () => {
  const { t, language } = useLanguage();
  const [selectedHabitat, setSelectedHabitat] = useState(null);

  const habitats = [
    {
      id: 1,
      name: "Great Barrier Reef, Australien",
      location: "Australien",
      description:
        "Heimat verschiedener Haiarten, einschließlich Riffhaie und Walhaie",
      detailedInfo:
        "Das Great Barrier Reef ist das größte Korallenriffsystem der Welt und erstreckt sich über 2.300 Kilometer entlang der Nordostküste Australiens. Es beherbergt über 50 verschiedene Haiarten und bietet ideale Bedingungen für Riffhaie, die in den flachen Lagunen jagen, sowie für Walhaie, die durch die offenen Gewässer gleiten.",
      climate: "Tropisch, 23-29°C",
      depth: "0-200m",
      bestTime: "Juni - Oktober",
      coordinates: { lat: -18.2871, lng: 147.6992 },
      image:
        "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes:
        "Weißspitzen-Riffhai, Schwarzspitzen-Riffhai, Walhai, Grauer Riffhai",
    },
    {
      id: 2,
      name: "Galapagos-Inseln, Ecuador",
      location: "Ecuador",
      description: "Berühmt für Hammerhaie und Walhaie",
      detailedInfo:
        "Die Galapagos-Inseln liegen im Pazifischen Ozean und sind ein UNESCO-Welterbe. Die einzigartige geografische Lage, wo mehrere Meeresströmungen zusammentreffen, macht sie zu einem Hotspot für große pelagische Haiarten. Besonders berühmt sind die riesigen Hammerhai-Schulen, die hier in Hunderten zusammenkommen.",
      climate: "Subtropisch, 16-25°C",
      depth: "10-400m",
      bestTime: "Juni - November",
      coordinates: { lat: -0.9538, lng: -90.9656 },
      image:
        "https://images.pexels.com/photos/18631595/pexels-photo-18631595.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Hammerhai, Walhai, Galapagos-Hai, Seidenhai",
    },
    {
      id: 3,
      name: "Guadalupe Island, Mexiko",
      location: "Mexiko",
      description: "Am bekanntesten für Begegnungen mit Weißen Haien",
      detailedInfo:
        "Guadalupe Island ist eine vulkanische Insel 240 km westlich der Baja California Halbinsel. Sie ist weltberühmt für ihre große Population von Weißen Haien. Das kristallklare Wasser bietet Sichtweiten von bis zu 40 Metern, was es zum besten Ort der Welt macht, um Weiße Haie zu beobachten.",
      climate: "Gemäßigt, 15-22°C",
      depth: "5-100m",
      bestTime: "Juli - November",
      coordinates: { lat: 29.0333, lng: -118.2833 },
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Weißer Hai, Blauhai",
    },
    {
      id: 4,
      name: "Malediven",
      location: "Indischer Ozean",
      description: "Kristallklare Gewässer, Heimat von Walhaien und Riffhaien",
      detailedInfo:
        "Die Malediven bestehen aus 26 ringförmigen Atollen mit über 1.000 Koralleninseln. Die warmen, nährstoffreichen Gewässer ziehen das ganze Jahr über Walhaie an. Die zahlreichen Kanäle zwischen den Atollen sind perfekte Jagdgründe für verschiedene Riffhai-Arten.",
      climate: "Tropisch, 26-30°C",
      depth: "0-150m",
      bestTime: "Mai - November (Walhaie)",
      coordinates: { lat: 3.2028, lng: 73.2207 },
      image:
        "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Walhai, Weißspitzen-Riffhai, Grauer Riffhai, Ammenhai",
    },
    {
      id: 5,
      name: "Südafrika Küste",
      location: "Südafrika",
      description: "Bekannt für Weiße Haie und vielfältiges Meeresleben",
      detailedInfo:
        "Die Küste Südafrikas, besonders um False Bay und Gansbaai, ist einer der besten Orte weltweit, um Weiße Haie zu beobachten. Die großen Robbenkolonien ziehen diese majestätischen Raubtiere an. Die kalten, nährstoffreichen Gewässer des Benguela-Stroms schaffen ideale Bedingungen.",
      climate: "Gemäßigt, 12-20°C",
      depth: "5-200m",
      bestTime: "April - September",
      coordinates: { lat: -34.1927, lng: 18.8739 },
      image:
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Weißer Hai, Tigerhai, Bullenhai, Bronzehai",
    },
    {
      id: 6,
      name: "Bahamas",
      location: "Karibik",
      description: "Tigerhaie und Karibische Riffhaie gedeihen hier",
      detailedInfo:
        "Die Bahamas mit ihren über 700 Inseln und Cays bieten einige der klarsten Gewässer der Welt. Tiger Beach ist weltberühmt für Tigerhai-Begegnungen. Die flachen Bänke und tiefen Gräben schaffen vielfältige Lebensräume für verschiedene Haiarten.",
      climate: "Tropisch, 24-28°C",
      depth: "0-100m",
      bestTime: "Oktober - Januar (Tigerhaie)",
      coordinates: { lat: 25.0343, lng: -77.3963 },
      image:
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=600",
      sharkTypes: "Tigerhai, Karibischer Riffhai, Zitronenhai, Hammerhai",
    },
  ];

  const handleHabitatClick = (habitat) => {
    setSelectedHabitat(selectedHabitat?.id === habitat.id ? null : habitat);
  };

  return (
    <div className="habitats-container">
      <h2 className="habitats-title">
        🌊{" "}
        {t("Hai-Lebensräume auf der Welt", "Shark Habitats Around the World")}
      </h2>
      <p className="habitats-intro">
        {t(
          "Entdecke die wunderschönen Inseln und Küstenregionen, in denen Haie leben und in ihrem natürlichen Lebensraum gedeihen. Klicke auf eine Karte für detaillierte Informationen.",
          "Discover the beautiful islands and coastal regions where sharks live and thrive in their natural habitat. Click on a card for detailed information."
        )}
      </p>

      <div className="habitats-grid">
        {habitats.map((habitat) => (
          <div
            key={habitat.id}
            className={`habitat-card ${
              selectedHabitat?.id === habitat.id ? "active" : ""
            }`}
            onClick={() => handleHabitatClick(habitat)}
          >
            <div className="habitat-image-container">
              <img
                src={habitat.image}
                alt={habitat.name}
                className="habitat-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x250/0077cc/ffffff?text=Ocean+Habitat";
                }}
              />
              <div className="habitat-overlay">
                <span className="shark-types">
                  {habitat.sharkTypes.split(",")[0]}
                </span>
              </div>
            </div>
            <div className="habitat-content">
              <h3 className="habitat-name">{habitat.name}</h3>
              <p className="habitat-description">{habitat.description}</p>
              <button className="btn-view-details">
                {selectedHabitat?.id === habitat.id
                  ? "✕ Schließen"
                  : "📍 Details anzeigen"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedHabitat && (
        <div className="habitat-detail-modal">
          <div className="habitat-detail-content">
            <button
              className="modal-close"
              onClick={() => setSelectedHabitat(null)}
            >
              ✕
            </button>

            <div className="habitat-detail-header">
              <h2>{selectedHabitat.name}</h2>
              <span className="habitat-location-badge">
                📍 {selectedHabitat.location}
              </span>
            </div>

            <div className="habitat-detail-grid">
              <div className="habitat-detail-left">
                <img
                  src={selectedHabitat.image}
                  alt={selectedHabitat.name}
                  className="habitat-detail-image"
                />

                <div className="habitat-map-placeholder">
                  <div
                    className="map-marker"
                    style={{
                      top: `${
                        50 + (selectedHabitat.coordinates.lat / 90) * 20
                      }%`,
                      left: `${
                        50 + (selectedHabitat.coordinates.lng / 180) * 40
                      }%`,
                    }}
                  >
                    <span className="map-marker-dot"></span>
                    <span className="map-marker-label">
                      {selectedHabitat.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="habitat-detail-right">
                <div className="detail-section">
                  <h3>
                    📖 {t("Über diesen Lebensraum", "About This Habitat")}
                  </h3>
                  <p>{selectedHabitat.detailedInfo}</p>
                </div>

                <div className="detail-info-grid">
                  <div className="detail-info-item">
                    <span className="detail-icon">🌡️</span>
                    <div>
                      <strong>{t("Klima", "Climate")}</strong>
                      <p>{selectedHabitat.climate}</p>
                    </div>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-icon">🌊</span>
                    <div>
                      <strong>{t("Tiefe", "Depth")}</strong>
                      <p>{selectedHabitat.depth}</p>
                    </div>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-icon">📅</span>
                    <div>
                      <strong>
                        {t("Beste Reisezeit", "Best Time to Visit")}
                      </strong>
                      <p>{selectedHabitat.bestTime}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>
                    🦈{" "}
                    {t(
                      "Haiarten in diesem Gebiet",
                      "Shark Species in This Area"
                    )}
                  </h3>
                  <div className="shark-species-list">
                    {selectedHabitat.sharkTypes
                      .split(",")
                      .map((shark, index) => (
                        <span key={index} className="shark-species-tag">
                          {shark.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharkHabitats;
