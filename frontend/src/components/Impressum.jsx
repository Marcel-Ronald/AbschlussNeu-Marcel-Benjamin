import React from "react";

const Impressum = () => {
  return (
    <div className="impressum-container">
      <div className="impressum-content">
        <h1 className="impressum-title">Impressum</h1>

        <div className="impressum-section">
          <h2>Angaben gemäß § 5 TMG</h2>

          <div className="impressum-persons">
            <div className="impressum-person">
              <h3>Benjamin Graefe</h3>
              <p>Mahlhaus 13H</p>
              <p>22159 Hamburg</p>
            </div>

            <div className="impressum-person">
              <h3>Marcel-Ronald Rajenkowski</h3>
              <p>Fritz-Werner-Straße 27</p>
              <p>12107 Berlin</p>
            </div>
          </div>
        </div>

        <div className="impressum-section">
          <h2>Kontakt</h2>
          <p>Diese Website wurde im Rahmen eines Bildungsprojekts erstellt.</p>
        </div>

        <div className="impressum-section">
          <h2>Haftungsausschluss</h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen.
          </p>

          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen.
          </p>
        </div>

        <div className="impressum-section">
          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
