import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Footer = ({ setActivePage }) => {
  const { t } = useLanguage();
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
            <p>
              {t(
                "Deine Quelle für Hai-Informationen",
                "Your source for shark information"
              )}
            </p>
            <p className="footer-tagline">
              {t(
                "Entdecke die faszinierende Welt der Haie",
                "Discover the fascinating world of sharks"
              )}
            </p>
            <p>🔍 {t("Über 48 Hai-Arten", "Over 48 shark species")}</p>
            <p>📚 {t("Detaillierte Infos", "Detailed information")}</p>
            <p>🗺️ {t("Lebensräume weltweit", "Habitats worldwide")}</p>
          </div>

          <div className="footer-section footer-contact">
            <h3>📬 {t("Kontakt", "Contact")}</h3>
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
            <p>{t("Ozean Forschung 2025", "Ocean Research 2025")}</p>
            <p>{t("Bildung & Naturschutz", "Education & Conservation")}</p>
            <p>🐋 {t("Meeresbiologie", "Marine Biology")}</p>
            <p>🌍 {t("Umweltschutz", "Environmental Protection")}</p>
            <p>📖 {t("Wissensvermittlung", "Knowledge Transfer")}</p>
            <p>🦈 {t("Hai-Schutzprojekte", "Shark Conservation Projects")}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 Hai Wiki -{" "}
            {t("Alle Rechte vorbehalten", "All rights reserved")}
          </p>
          <p>
            <Link to="/impressum" className="impressum-link">
              📜 {t("Impressum", "Imprint")}
            </Link>
          </p>
          <p>🦈 {t("Schütze unsere Ozeane", "Protect our oceans")} 🌊</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
