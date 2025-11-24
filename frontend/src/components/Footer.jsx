import React from "react";

const Footer = ({ setActivePage }) => {
  return (
    <footer className="footer">
      <div className="beach-scene">
        {/* Sand */}
        <div className="sand">
          <div className="sand-texture"></div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-section">
            <h3>Hai Wiki</h3>
            <p>Deine Quelle für Hai-Informationen</p>
          </div>

          <div className="footer-section">
            <h3>Kontakt</h3>
            <p>📧 kommt noch</p>
            <p>🌊 Ozean Forschung 2025</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Hai Wiki - Alle Rechte vorbehalten</p>
          <p>🦈 Schütze unsere Ozeane 🌊</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
