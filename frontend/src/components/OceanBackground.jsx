import React from "react";

const OceanBackground = () => {
  return (
    <div className="ocean-background">
      {/* Lichtstrahlen von oben */}
      <div className="light-rays">
        <div className="ray ray1"></div>
        <div className="ray ray2"></div>
        <div className="ray ray3"></div>
        <div className="ray ray4"></div>
      </div>

      {/* Aufsteigende Blasen */}
      <div className="bubbles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`bubble bubble${i + 1}`}></div>
        ))}
      </div>

      {/* Schwebende Partikel */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default OceanBackground;
