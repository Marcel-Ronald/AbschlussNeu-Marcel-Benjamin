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
            <h3>🦈 Hai Wiki</h3>
            <p>Deine Quelle für Hai-Informationen</p>
            <p className="footer-tagline">
              Entdecke die faszinierende Welt der Haie
            </p>
            <p>🔍 Über 48 Hai-Arten</p>
            <p>📚 Detaillierte Infos</p>
            <p>🗺️ Lebensräume weltweit</p>
          </div>

          <div className="footer-section footer-contact">
            <h3>📬 Kontakt</h3>
            <div className="contact-item">
              <p className="contact-name">👤 Marcel-Ronald Rajenkowski</p>
              <a href="mailto:Rajenkowski@gmail.com" className="contact-email">
                📧 Rajenkowski@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <p className="contact-name">👤 Benjamin Graefe</p>
              <a href="mailto:Benny.bg@gmx.de" className="contact-email">
                📧 Benny.bg@gmx.de
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>🌊 Info</h3>
            <p>Ozean Forschung 2025</p>
            <p>Bildung & Naturschutz</p>
            <p>🐋 Meeresbiologie</p>
            <p>🌍 Umweltschutz</p>
            <p>📖 Wissensvermittlung</p>
            <p>🦈 Hai-Schutzprojekte</p>
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
