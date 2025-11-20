import React, { useState } from "react";

const SharkDangerZones = () => {
  const [selectedZone, setSelectedZone] = useState(null);

  const dangerZones = [
    {
      id: 1,
      name: "Reunion Island",
      location: "Indischer Ozean",
      dangerLevel: "Extrem",
      description:
        "Bekannt als die Hai-Angriff-Hauptstadt der Welt. Mehrere Angriffe jährlich verzeichnet.",
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
      coordinates: "21.1151° S, 55.5364° E",
      sharkSpecies: "Bullenhaie, Tigerhaie",
      attacks: "Hohe Häufigkeit",
      mapImage:
        "https://images.pexels.com/photos/269630/pexels-photo-269630.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "New Smyrna Beach, Florida",
      location: "USA",
      dangerLevel: "Hoch",
      description:
        "Die 'Hai-Biss-Hauptstadt der Welt' mit den meisten Haibissen pro Kopf.",
      image:
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=600",
      coordinates: "29.0258° N, 80.9270° W",
      sharkSpecies: "Schwarzspitzen-Haie, Spinner-Haie",
      attacks: "Sehr häufig (meist kleinere Bisse)",
      mapImage:
        "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Gansbaai, Südafrika",
      location: "Südafrika",
      dangerLevel: "Hoch",
      description:
        "Shark Alley - berühmt für dichte Weiße Hai-Population und Käfigtauchen.",
      image:
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600",
      coordinates: "34.5804° S, 19.3516° E",
      sharkSpecies: "Weiße Haie",
      attacks: "Mittlere Häufigkeit",
      mapImage:
        "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Recife, Brasilien",
      location: "Brasilien",
      dangerLevel: "Hoch",
      description:
        "Hohe Konzentration von Bullenhai-Angriffen, besonders nahe Flussmündungen.",
      image:
        "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=600",
      coordinates: "8.0476° S, 34.8770° W",
      sharkSpecies: "Bullenhaie, Tigerhaie",
      attacks: "Häufig",
      mapImage:
        "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Bolinas, Kalifornien",
      location: "USA",
      dangerLevel: "Mittel",
      description:
        "Teil des Roten Dreiecks - eine Region mit hoher Weißer Hai-Aktivität.",
      image:
        "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=600",
      coordinates: "37.9088° N, 122.6864° W",
      sharkSpecies: "Weiße Haie",
      attacks: "Mäßig",
      mapImage:
        "https://images.pexels.com/photos/2179602/pexels-photo-2179602.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      name: "Queensland, Australien",
      location: "Australien",
      dangerLevel: "Mittel",
      description:
        "Mehrere Haiarten vorhanden, besonders entlang der Gold Coast und Sunshine Coast.",
      image:
        "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=600",
      coordinates: "20.9176° S, 142.7028° E",
      sharkSpecies: "Tigerhaie, Bullenhaie, Weiße Haie",
      attacks: "Mäßig",
      mapImage:
        "https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const sightingHotspots = [
    {
      id: 1,
      name: "Guadalupe Island",
      location: "Mexiko",
      description:
        "Erstklassiges Tauchziel für Weiße Haie mit ganzjährigen Sichtungen.",
      image:
        "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600",
      bestTime: "Juli - November",
      sharkCount: "150+ Weiße Haie",
      visibility: "Ausgezeichnet (30m+)",
    },
    {
      id: 2,
      name: "Ningaloo Reef",
      location: "Australien",
      description: "Walhai-Migrationspunkt mit zuverlässigen Sichtungen.",
      image:
        "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600",
      bestTime: "März - Juli",
      sharkCount: "300+ Walhaie jährlich",
      visibility: "Ausgezeichnet",
    },
    {
      id: 3,
      name: "Cocos Island",
      location: "Costa Rica",
      description: "Riesige Schwärme von Hammerhaien versammeln sich hier.",
      image:
        "https://images.pexels.com/photos/18631595/pexels-photo-18631595.jpeg?auto=compress&cs=tinysrgb&w=600",
      bestTime: "Juni - Dezember",
      sharkCount: "Hunderte von Hammerhaien",
      visibility: "Gut bis Ausgezeichnet",
    },
    {
      id: 4,
      name: "Tiger Beach",
      location: "Bahamas",
      description:
        "Berühmt für ruhige Tigerhai-Begegnungen in kristallklarem Wasser.",
      image:
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=600",
      bestTime: "Oktober - Januar",
      sharkCount: "20-30 Tigerhaie",
      visibility: "Kristallklar (40m+)",
    },
  ];

  const getDangerColor = (level) => {
    switch (level) {
      case "Extrem":
        return "#d32f2f";
      case "Hoch":
        return "#ff6f00";
      case "Mittel":
        return "#ffa000";
      default:
        return "#388e3c";
    }
  };

  return (
    <div className="danger-zones-container">
      {/* Danger Zones Section */}
      <section className="zones-section">
        <h2 className="section-title">
          ⚠️ Hai-Gefahrenzonen & Angriffs-Hotspots
        </h2>
        <p className="section-intro">
          Diese Orte haben die höchsten aufgezeichneten Hai-Begegnungen und
          Angriffe. Üben Sie äußerste Vorsicht beim Schwimmen oder Surfen in
          diesen Gebieten.
        </p>

        <div className="danger-zones-grid">
          {dangerZones.map((zone) => (
            <div
              key={zone.id}
              className="danger-zone-card"
              onClick={() => setSelectedZone(zone)}
              style={{
                borderTop: `4px solid ${getDangerColor(zone.dangerLevel)}`,
              }}
            >
              <div
                className="danger-badge"
                style={{ background: getDangerColor(zone.dangerLevel) }}
              >
                {zone.dangerLevel} Risiko
              </div>

              <div className="zone-image-container">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="zone-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x200/d32f2f/ffffff?text=Danger+Zone";
                  }}
                />
                <div className="zone-overlay-danger">
                  <span className="coordinates-badge">
                    📍 {zone.coordinates}
                  </span>
                </div>
              </div>

              <div className="zone-content">
                <h3 className="zone-name">{zone.name}</h3>
                <p className="zone-location">📍 {zone.location}</p>
                <p className="zone-description">{zone.description}</p>

                <div className="zone-stats">
                  <div className="stat-item">
                    <span className="stat-label">🦈 Arten:</span>
                    <span className="stat-value">{zone.sharkSpecies}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">⚠️ Angriffe:</span>
                    <span className="stat-value">{zone.attacks}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sighting Hotspots Section */}
      <section className="zones-section">
        <h2 className="section-title">
          🗺️ Top Hai-Sichtungs-Inseln & Hotspots
        </h2>
        <p className="section-intro">
          Die besten Orte der Welt, um Haie in ihrem natürlichen Lebensraum zu
          beobachten. Perfekt für Tauchen und Öko-Tourismus.
        </p>

        <div className="hotspots-grid">
          {sightingHotspots.map((spot) => (
            <div key={spot.id} className="hotspot-card">
              <div className="hotspot-image-container">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="hotspot-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250/0077cc/ffffff?text=Shark+Hotspot";
                  }}
                />
                <div className="best-time-badge">{spot.bestTime}</div>
              </div>

              <div className="hotspot-content">
                <h3 className="hotspot-name">{spot.name}</h3>
                <p className="hotspot-location">📍 {spot.location}</p>
                <p className="hotspot-description">{spot.description}</p>

                <div className="hotspot-info">
                  <div className="info-row">
                    <span className="info-icon">🦈</span>
                    <span className="info-text">{spot.sharkCount}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-icon">👁️</span>
                    <span className="info-text">{spot.visibility}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for detailed zone info */}
      {selectedZone && (
        <div
          className="zone-modal-overlay"
          onClick={() => setSelectedZone(null)}
        >
          <div className="zone-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedZone(null)}
            >
              ✕
            </button>
            <h2>{selectedZone.name}</h2>
            <img
              src={selectedZone.mapImage}
              alt={`Map of ${selectedZone.name}`}
              className="modal-map-image"
            />
            <div className="modal-details">
              <p>
                <strong>Ort:</strong> {selectedZone.location}
              </p>
              <p>
                <strong>Koordinaten:</strong> {selectedZone.coordinates}
              </p>
              <p>
                <strong>Gefahrenstufe:</strong>{" "}
                <span
                  style={{ color: getDangerColor(selectedZone.dangerLevel) }}
                >
                  {selectedZone.dangerLevel}
                </span>
              </p>
              <p>
                <strong>Haiarten:</strong> {selectedZone.sharkSpecies}
              </p>
              <p>
                <strong>Angriffshäufigkeit:</strong> {selectedZone.attacks}
              </p>
              <p className="modal-description">{selectedZone.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharkDangerZones;
