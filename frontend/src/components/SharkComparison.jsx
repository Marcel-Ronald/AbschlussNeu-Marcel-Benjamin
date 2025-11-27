import React, { useState, useEffect } from "react";

const SharkComparison = () => {
  const [sharks, setSharks] = useState([]);
  const [selectedShark1, setSelectedShark1] = useState(null);
  const [selectedShark2, setSelectedShark2] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);
  const [hoveredShark, setHoveredShark] = useState(null);
  const [viewMode, setViewMode] = useState("side-by-side"); // 'side-by-side', 'overlay', 'stacked'

  useEffect(() => {
    const fetchSharks = async () => {
      try {
        const response = await fetch("http://localhost:3001/sharks/all");
        if (response.ok) {
          const data = await response.json();
          setSharks(data);
        }
      } catch (err) {
        console.error("Fehler beim Laden der Haie:", err);
      }
    };
    fetchSharks();
  }, []);

  const getDangerLevel = (danger) => {
    if (!danger) return "Unbekannt";
    const lowerDanger = danger.toLowerCase();
    if (lowerDanger.includes("hoch") || lowerDanger.includes("extrem"))
      return "Hoch";
    if (lowerDanger.includes("mittel") || lowerDanger.includes("mäßig"))
      return "Mittel";
    if (lowerDanger.includes("gering") || lowerDanger.includes("keine"))
      return "Gering";
    return danger;
  };

  const getDangerColor = (danger) => {
    const level = getDangerLevel(danger);
    if (level === "Hoch") return "#ff5733";
    if (level === "Mittel") return "#ffc107";
    return "#4caf50";
  };

  const resetComparison = () => {
    setSelectedShark1(null);
    setSelectedShark2(null);
    setShowVisualization(false);
  };

  const renderSizeVisualization = () => {
    if (!selectedShark1 && !selectedShark2) return null;

    const maxLength = Math.max(
      selectedShark1?.average_length_m || 0,
      selectedShark2?.average_length_m || 0,
      1.8 // Mensch
    );
    const scale = 600 / maxLength;
    const humanHeight = 1.8 * scale;
    return (
      <div className="size-visualization">
        <h3>📏 Größenvergleich mit Mensch</h3>

        {/* View Mode Controls */}
        <div className="view-mode-controls">
          <button
            className={`view-btn ${
              viewMode === "side-by-side" ? "active" : ""
            }`}
            onClick={() => setViewMode("side-by-side")}
          >
            Nebeneinander
          </button>
          <button
            className={`view-btn ${viewMode === "overlay" ? "active" : ""}`}
            onClick={() => setViewMode("overlay")}
          >
            Überlagert
          </button>
          <button
            className={`view-btn ${viewMode === "stacked" ? "active" : ""}`}
            onClick={() => setViewMode("stacked")}
          >
            Gestapelt
          </button>
        </div>

        <svg
          width="100%"
          height="400"
          viewBox="0 0 800 400"
          className="interactive-svg"
        >
          {/* Raster */}
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </pattern>

            {/* Gradient für Haie */}
            <linearGradient
              id="sharkGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#0077cc", stopOpacity: 0.8 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#005599", stopOpacity: 0.9 }}
              />
            </linearGradient>

            <linearGradient
              id="sharkGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#ff6b6b", stopOpacity: 0.8 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ff5733", stopOpacity: 0.9 }}
              />
            </linearGradient>
          </defs>

          <rect width="800" height="400" fill="url(#grid)" />

          {/* Bodenlinie */}
          <line
            x1="0"
            y1="350"
            x2="800"
            y2="350"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {viewMode === "side-by-side" && (
            <>
              {/* Mensch (Referenz) */}
              <g transform="translate(50, 350)">
                {/* Körper */}
                <ellipse
                  cx="10"
                  cy={-humanHeight / 2}
                  rx="12"
                  ry={humanHeight / 2}
                  fill="#5eb3f6"
                  opacity="0.7"
                />
                {/* Kopf */}
                <circle
                  cx="10"
                  cy={-humanHeight - 10}
                  r="15"
                  fill="#5eb3f6"
                  opacity="0.7"
                />
                {/* Arme */}
                <line
                  x1="10"
                  y1={-humanHeight + 20}
                  x2="-10"
                  y2={-humanHeight + 40}
                  stroke="#5eb3f6"
                  strokeWidth="4"
                  opacity="0.7"
                />
                <line
                  x1="10"
                  y1={-humanHeight + 20}
                  x2="30"
                  y2={-humanHeight + 40}
                  stroke="#5eb3f6"
                  strokeWidth="4"
                  opacity="0.7"
                />
                {/* Beine */}
                <line
                  x1="10"
                  y1={-20}
                  x2="0"
                  y2="0"
                  stroke="#5eb3f6"
                  strokeWidth="4"
                  opacity="0.7"
                />
                <line
                  x1="10"
                  y1={-20}
                  x2="20"
                  y2="0"
                  stroke="#5eb3f6"
                  strokeWidth="4"
                  opacity="0.7"
                />
                <text
                  x="10"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  👤 1.8m
                </text>
              </g>

              {/* Hai 1 */}
              {selectedShark1 && (
                <g
                  transform="translate(200, 320)"
                  className={`shark-svg ${hoveredShark === 1 ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredShark(1)}
                  onMouseLeave={() => setHoveredShark(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Hauptkörper */}
                  <ellipse
                    cx={(selectedShark1.average_length_m * scale) / 2}
                    cy={-40}
                    rx={(selectedShark1.average_length_m * scale) / 2}
                    ry="30"
                    fill="url(#sharkGradient1)"
                    className="shark-body"
                  />
                  {/* Rückenflosse */}
                  <path
                    d={`M ${
                      (selectedShark1.average_length_m * scale) / 2
                    } -70 L ${
                      (selectedShark1.average_length_m * scale) / 2 + 15
                    } -60 L ${
                      (selectedShark1.average_length_m * scale) / 2 - 10
                    } -40 Z`}
                    fill="url(#sharkGradient1)"
                  />
                  {/* Schwanzflosse */}
                  <path
                    d={`M ${selectedShark1.average_length_m * scale} -40 L ${
                      selectedShark1.average_length_m * scale + 25
                    } -55 L ${
                      selectedShark1.average_length_m * scale + 25
                    } -25 Z`}
                    fill="url(#sharkGradient1)"
                  />
                  {/* Brustflossen */}
                  <ellipse
                    cx={(selectedShark1.average_length_m * scale) / 3}
                    cy={-30}
                    rx="15"
                    ry="8"
                    fill="url(#sharkGradient1)"
                    opacity="0.7"
                  />
                  {/* Auge */}
                  <circle
                    cx={(selectedShark1.average_length_m * scale) / 6}
                    cy={-45}
                    r="4"
                    fill="white"
                  />
                  <circle
                    cx={(selectedShark1.average_length_m * scale) / 6}
                    cy={-45}
                    r="2"
                    fill="black"
                  />
                  <text
                    x={(selectedShark1.average_length_m * scale) / 2}
                    y="-90"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {selectedShark1.name}
                  </text>
                  <text
                    x={(selectedShark1.average_length_m * scale) / 2}
                    y="-72"
                    textAnchor="middle"
                    fill="#5eb3f6"
                    fontSize="14"
                  >
                    {selectedShark1.average_length_m}m |{" "}
                    {selectedShark1.average_weight_kg}kg
                  </text>
                </g>
              )}

              {/* Hai 2 */}
              {selectedShark2 && (
                <g
                  transform="translate(200, 180)"
                  className={`shark-svg ${hoveredShark === 2 ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredShark(2)}
                  onMouseLeave={() => setHoveredShark(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Hauptkörper */}
                  <ellipse
                    cx={(selectedShark2.average_length_m * scale) / 2}
                    cy={-40}
                    rx={(selectedShark2.average_length_m * scale) / 2}
                    ry="30"
                    fill="url(#sharkGradient2)"
                    className="shark-body"
                  />
                  {/* Rückenflosse */}
                  <path
                    d={`M ${
                      (selectedShark2.average_length_m * scale) / 2
                    } -70 L ${
                      (selectedShark2.average_length_m * scale) / 2 + 15
                    } -60 L ${
                      (selectedShark2.average_length_m * scale) / 2 - 10
                    } -40 Z`}
                    fill="url(#sharkGradient2)"
                  />
                  {/* Schwanzflosse */}
                  <path
                    d={`M ${selectedShark2.average_length_m * scale} -40 L ${
                      selectedShark2.average_length_m * scale + 25
                    } -55 L ${
                      selectedShark2.average_length_m * scale + 25
                    } -25 Z`}
                    fill="url(#sharkGradient2)"
                  />
                  {/* Brustflossen */}
                  <ellipse
                    cx={(selectedShark2.average_length_m * scale) / 3}
                    cy={-30}
                    rx="15"
                    ry="8"
                    fill="url(#sharkGradient2)"
                    opacity="0.7"
                  />
                  {/* Auge */}
                  <circle
                    cx={(selectedShark2.average_length_m * scale) / 6}
                    cy={-45}
                    r="4"
                    fill="white"
                  />
                  <circle
                    cx={(selectedShark2.average_length_m * scale) / 6}
                    cy={-45}
                    r="2"
                    fill="black"
                  />
                  <text
                    x={(selectedShark2.average_length_m * scale) / 2}
                    y="-90"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {selectedShark2.name}
                  </text>
                  <text
                    x={(selectedShark2.average_length_m * scale) / 2}
                    y="-72"
                    textAnchor="middle"
                    fill="#ff6b6b"
                    fontSize="14"
                  >
                    {selectedShark2.average_length_m}m |{" "}
                    {selectedShark2.average_weight_kg}kg
                  </text>
                </g>
              )}
            </>
          )}

          {viewMode === "overlay" && (
            <>
              {/* Mensch in der Mitte */}
              <g transform="translate(100, 350)">
                <ellipse
                  cx="10"
                  cy={-humanHeight / 2}
                  rx="12"
                  ry={humanHeight / 2}
                  fill="#5eb3f6"
                  opacity="0.7"
                />
                <circle
                  cx="10"
                  cy={-humanHeight - 10}
                  r="15"
                  fill="#5eb3f6"
                  opacity="0.7"
                />
                <text
                  x="10"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  👤 1.8m
                </text>
              </g>

              {/* Beide Haie überlagert */}
              {selectedShark1 && (
                <g transform="translate(250, 280)">
                  <ellipse
                    cx={(selectedShark1.average_length_m * scale) / 2}
                    cy={-40}
                    rx={(selectedShark1.average_length_m * scale) / 2}
                    ry="30"
                    fill="url(#sharkGradient1)"
                    opacity="0.6"
                  />
                  <path
                    d={`M ${selectedShark1.average_length_m * scale} -40 L ${
                      selectedShark1.average_length_m * scale + 25
                    } -55 L ${
                      selectedShark1.average_length_m * scale + 25
                    } -25 Z`}
                    fill="url(#sharkGradient1)"
                    opacity="0.6"
                  />
                  <text
                    x={(selectedShark1.average_length_m * scale) / 2}
                    y="-80"
                    textAnchor="middle"
                    fill="#5eb3f6"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {selectedShark1.name} ({selectedShark1.average_length_m}m)
                  </text>
                </g>
              )}

              {selectedShark2 && (
                <g transform="translate(250, 250)">
                  <ellipse
                    cx={(selectedShark2.average_length_m * scale) / 2}
                    cy={-40}
                    rx={(selectedShark2.average_length_m * scale) / 2}
                    ry="30"
                    fill="url(#sharkGradient2)"
                    opacity="0.6"
                  />
                  <path
                    d={`M ${selectedShark2.average_length_m * scale} -40 L ${
                      selectedShark2.average_length_m * scale + 25
                    } -55 L ${
                      selectedShark2.average_length_m * scale + 25
                    } -25 Z`}
                    fill="url(#sharkGradient2)"
                    opacity="0.6"
                  />
                  <text
                    x={(selectedShark2.average_length_m * scale) / 2}
                    y="-100"
                    textAnchor="middle"
                    fill="#ff6b6b"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {selectedShark2.name} ({selectedShark2.average_length_m}m)
                  </text>
                </g>
              )}
            </>
          )}

          {viewMode === "stacked" && (
            <>
              {/* Gestapelte Ansicht - horizontal */}
              <g transform="translate(100, 100)">
                <text x="0" y="-10" fill="white" fontSize="14">
                  Längenvergleich:
                </text>

                {/* Mensch */}
                <rect
                  x="0"
                  y="0"
                  width={humanHeight * 25}
                  height="30"
                  fill="#5eb3f6"
                  opacity="0.7"
                  rx="5"
                />
                <text
                  x={humanHeight * 12.5}
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  👤 1.8m
                </text>

                {/* Hai 1 */}
                {selectedShark1 && (
                  <>
                    <rect
                      x="0"
                      y="50"
                      width={selectedShark1.average_length_m * 50}
                      height="35"
                      fill="url(#sharkGradient1)"
                      rx="5"
                    />
                    <text
                      x={selectedShark1.average_length_m * 25}
                      y="72"
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {selectedShark1.name} - {selectedShark1.average_length_m}m
                    </text>
                  </>
                )}

                {/* Hai 2 */}
                {selectedShark2 && (
                  <>
                    <rect
                      x="0"
                      y="100"
                      width={selectedShark2.average_length_m * 50}
                      height="35"
                      fill="url(#sharkGradient2)"
                      rx="5"
                    />
                    <text
                      x={selectedShark2.average_length_m * 25}
                      y="122"
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {selectedShark2.name} - {selectedShark2.average_length_m}m
                    </text>
                  </>
                )}
              </g>

              {/* Gewichtsvergleich */}
              <g transform="translate(100, 270)">
                <text x="0" y="-10" fill="white" fontSize="14">
                  Gewichtsvergleich:
                </text>

                {selectedShark1 && (
                  <>
                    <rect
                      x="0"
                      y="0"
                      width={Math.min(
                        selectedShark1.average_weight_kg / 3,
                        600
                      )}
                      height="25"
                      fill="url(#sharkGradient1)"
                      rx="5"
                    />
                    <text
                      x="10"
                      y="17"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {selectedShark1.name}: {selectedShark1.average_weight_kg}
                      kg
                    </text>
                  </>
                )}

                {selectedShark2 && (
                  <>
                    <rect
                      x="0"
                      y="35"
                      width={Math.min(
                        selectedShark2.average_weight_kg / 3,
                        600
                      )}
                      height="25"
                      fill="url(#sharkGradient2)"
                      rx="5"
                    />
                    <text
                      x="10"
                      y="52"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {selectedShark2.name}: {selectedShark2.average_weight_kg}
                      kg
                    </text>
                  </>
                )}
              </g>
            </>
          )}
        </svg>

        {/* Info Box bei Hover */}
        {hoveredShark && (
          <div className="shark-info-tooltip">
            <h4>
              {hoveredShark === 1 ? selectedShark1?.name : selectedShark2?.name}
            </h4>
            <p>
              <strong>Länge:</strong>{" "}
              {hoveredShark === 1
                ? selectedShark1?.average_length_m
                : selectedShark2?.average_length_m}
              m
            </p>
            <p>
              <strong>Gewicht:</strong>{" "}
              {hoveredShark === 1
                ? selectedShark1?.average_weight_kg
                : selectedShark2?.average_weight_kg}
              kg
            </p>
            <p>
              <strong>Gefahr:</strong>{" "}
              <span
                style={{
                  color: getDangerColor(
                    hoveredShark === 1
                      ? selectedShark1?.gefahr
                      : selectedShark2?.gefahr
                  ),
                }}
              >
                {getDangerLevel(
                  hoveredShark === 1
                    ? selectedShark1?.gefahr
                    : selectedShark2?.gefahr
                )}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="comparison-page">
      <h1 className="page-title">⚖️ Hai-Vergleichstool</h1>
      <p className="page-subtitle">Vergleiche zwei Haie direkt miteinander</p>

      {/* Shark Selection */}
      <div className="shark-selection-grid">
        <div className="selection-panel">
          <h3>Hai 1 wählen</h3>
          <select
            value={selectedShark1?.id || ""}
            onChange={(e) => {
              const shark = sharks.find(
                (s) => s.id === parseInt(e.target.value)
              );
              setSelectedShark1(shark);
            }}
            className="shark-selector"
          >
            <option value="">-- Hai auswählen --</option>
            {sharks.map((shark) => (
              <option key={shark.id} value={shark.id}>
                {shark.name}
              </option>
            ))}
          </select>

          {selectedShark1 && (
            <div className="selected-shark-preview shark1">
              <img src={selectedShark1.image} alt={selectedShark1.name} />
              <h4>{selectedShark1.name}</h4>
              <p className="scientific-name">
                {selectedShark1.scientific_name}
              </p>
            </div>
          )}
        </div>

        <div className="vs-divider">
          <span className="vs-text">VS</span>
        </div>

        <div className="selection-panel">
          <h3>Hai 2 wählen</h3>
          <select
            value={selectedShark2?.id || ""}
            onChange={(e) => {
              const shark = sharks.find(
                (s) => s.id === parseInt(e.target.value)
              );
              setSelectedShark2(shark);
            }}
            className="shark-selector"
          >
            <option value="">-- Hai auswählen --</option>
            {sharks.map((shark) => (
              <option key={shark.id} value={shark.id}>
                {shark.name}
              </option>
            ))}
          </select>

          {selectedShark2 && (
            <div className="selected-shark-preview shark2">
              <img src={selectedShark2.image} alt={selectedShark2.name} />
              <h4>{selectedShark2.name}</h4>
              <p className="scientific-name">
                {selectedShark2.scientific_name}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedShark1 && selectedShark2 && (
        <>
          <div className="comparison-controls">
            <button
              className="btn-toggle-viz"
              onClick={() => setShowVisualization(!showVisualization)}
            >
              {showVisualization
                ? "📊 Tabelle anzeigen"
                : "📏 Größenvergleich anzeigen"}
            </button>
            <button className="btn-reset" onClick={resetComparison}>
              🔄 Neu vergleichen
            </button>
          </div>

          {showVisualization ? (
            renderSizeVisualization()
          ) : (
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Eigenschaft</th>
                    <th className="shark1-col">{selectedShark1.name}</th>
                    <th className="shark2-col">{selectedShark2.name}</th>
                    <th>Gewinner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>📏 Länge</strong>
                    </td>
                    <td
                      className={
                        selectedShark1.average_length_m >
                        selectedShark2.average_length_m
                          ? "winner"
                          : ""
                      }
                    >
                      {selectedShark1.average_length_m} m
                    </td>
                    <td
                      className={
                        selectedShark2.average_length_m >
                        selectedShark1.average_length_m
                          ? "winner"
                          : ""
                      }
                    >
                      {selectedShark2.average_length_m} m
                    </td>
                    <td className="winner-cell">
                      {selectedShark1.average_length_m >
                      selectedShark2.average_length_m
                        ? "🔵 " + selectedShark1.name
                        : selectedShark2.average_length_m >
                          selectedShark1.average_length_m
                        ? "🔴 " + selectedShark2.name
                        : "🟡 Gleichstand"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⚖️ Gewicht</strong>
                    </td>
                    <td
                      className={
                        selectedShark1.average_weight_kg >
                        selectedShark2.average_weight_kg
                          ? "winner"
                          : ""
                      }
                    >
                      {selectedShark1.average_weight_kg} kg
                    </td>
                    <td
                      className={
                        selectedShark2.average_weight_kg >
                        selectedShark1.average_weight_kg
                          ? "winner"
                          : ""
                      }
                    >
                      {selectedShark2.average_weight_kg} kg
                    </td>
                    <td className="winner-cell">
                      {selectedShark1.average_weight_kg >
                      selectedShark2.average_weight_kg
                        ? "🔵 " + selectedShark1.name
                        : selectedShark2.average_weight_kg >
                          selectedShark1.average_weight_kg
                        ? "🔴 " + selectedShark2.name
                        : "🟡 Gleichstand"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>🎂 Lebenserwartung</strong>
                    </td>
                    <td
                      className={
                        selectedShark1.lifespan_years >
                        selectedShark2.lifespan_years
                          ? "winner"
                          : ""
                      }
                    >
                      {selectedShark1.lifespan_years} Jahre
                    </td>
                    <td
                      className={
                        selectedShark2.lifespan_years >
                        selectedShark1.lifespan_years
                          ? "winner"
                          : ""
                      }
                    >
                      {selectedShark2.lifespan_years} Jahre
                    </td>
                    <td className="winner-cell">
                      {selectedShark1.lifespan_years >
                      selectedShark2.lifespan_years
                        ? "🔵 " + selectedShark1.name
                        : selectedShark2.lifespan_years >
                          selectedShark1.lifespan_years
                        ? "🔴 " + selectedShark2.name
                        : "🟡 Gleichstand"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⚠️ Gefahr</strong>
                    </td>
                    <td
                      style={{ color: getDangerColor(selectedShark1.gefahr) }}
                    >
                      {getDangerLevel(selectedShark1.gefahr)}
                    </td>
                    <td
                      style={{ color: getDangerColor(selectedShark2.gefahr) }}
                    >
                      {getDangerLevel(selectedShark2.gefahr)}
                    </td>
                    <td className="winner-cell">-</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>🍽️ Nahrung</strong>
                    </td>
                    <td>{selectedShark1.nahrung}</td>
                    <td>{selectedShark2.nahrung}</td>
                    <td className="winner-cell">-</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>🌍 Geburtsort</strong>
                    </td>
                    <td>{selectedShark1.geburtsort}</td>
                    <td>{selectedShark2.geburtsort}</td>
                    <td className="winner-cell">-</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>🏊 Gewohnheiten</strong>
                    </td>
                    <td>{selectedShark1.gewohnheiten}</td>
                    <td>{selectedShark2.gewohnheiten}</td>
                    <td className="winner-cell">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {!selectedShark1 && !selectedShark2 && (
        <div className="empty-state">
          <div className="empty-icon">🦈</div>
          <h3>Wähle zwei Haie zum Vergleichen</h3>
          <p>
            Nutze die Dropdown-Menüs oben, um zwei Haie auszuwählen und direkt
            zu vergleichen.
          </p>
        </div>
      )}
    </div>
  );
};

export default SharkComparison;
