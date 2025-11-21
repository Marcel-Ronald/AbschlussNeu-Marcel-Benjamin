import React, { useState, useEffect } from "react";

const SharkDetails = () => {
  const [sharkInfo, setSharkInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharks = async () => {
      try {
        const response = await fetch("http://localhost:3001/sharks/all");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Hai-Daten");
        }
        const data = await response.json();
        setSharkInfo(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSharks();
  }, []);

  if (loading) {
    return (
      <div className="shark-details-container">
        <h1>Lade Hai-Informationen...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shark-details-container">
        <h1>Fehler: {error}</h1>
      </div>
    );
  }

  const oldSharkInfo = [
    {
      id: 1,
      name: "Weißer Hai",
      geburtsort:
        "Küstengewässer weltweit, besonders Kalifornien, Südafrika, Australien",
      nahrung: "Robben, Seelöwen, Fische, Meeresschildkröten, Wale (Aas)",
      gefahr: "Hoch - Verantwortlich für die meisten Haiangriffe auf Menschen",
      gewohnheiten:
        "Einzelgänger, jagt bei Sonnenaufgang und -untergang, kann große Distanzen zurücklegen, bevorzugt kühle Gewässer",
      image: "/images/sharks/white-shark.avif",
    },
    {
      id: 2,
      name: "Hammerhai",
      geburtsort: "Tropische und subtropische Küstengewässer weltweit",
      nahrung: "Rochen, Fische, Tintenfische, Krebstiere",
      gefahr: "Mittel - Selten aggressiv gegenüber Menschen",
      gewohnheiten:
        "Oft in Schulen unterwegs, nutzt Kopfform als Sensor, wandert saisonal, jagt am Meeresboden",
      image: "/images/sharks/hammerhai.webp",
    },
    {
      id: 3,
      name: "Tigerhai",
      geburtsort: "Tropische und subtropische Gewässer weltweit",
      nahrung: "Alles - Fische, Schildkröten, Vögel, Delfine, sogar Müll",
      gefahr: "Hoch - Zweitgefährlichster Hai für Menschen",
      gewohnheiten:
        "Nachtaktiv, Einzelgänger, 'Mülleimer des Meeres', wandert große Strecken, bevorzugt trübes Wasser",
      image: "/images/sharks/tigerhai.jpg",
    },
    {
      id: 4,
      name: "Walhai",
      geburtsort: "Warme tropische Ozeane weltweit",
      nahrung: "Plankton, kleine Fische, Krill",
      gefahr: "Keine - Völlig harmlos für Menschen",
      gewohnheiten:
        "Filtrierer, langsamer Schwimmer, oft an der Oberfläche, wandert zu planktonreichen Gebieten, friedlich",
      image: "/images/sharks/walhai.avif",
    },
    {
      id: 5,
      name: "Blauhai",
      geburtsort: "Offene Ozeane weltweit in gemäßigten Zonen",
      nahrung: "Tintenfische, kleine Fische, Krebstiere",
      gefahr: "Gering - Kann neugierig sein, aber selten gefährlich",
      gewohnheiten:
        "Hochseebewohner, wandert extreme Distanzen, lebt in großen Tiefen, elegant und schnell",
      image: "/images/sharks/blauhai.jpg",
    },
    {
      id: 6,
      name: "Grönlandhai",
      geburtsort: "Arktische und subarktische Gewässer",
      nahrung: "Fische, Robben, Aas, manchmal Rentiere",
      gefahr: "Sehr gering - Lebt in extremer Tiefe",
      gewohnheiten:
        "Extrem langsam, lebt in eiskaltem Wasser, kann über 400 Jahre alt werden, tiefstes Leben",
      image: "/images/sharks/Grönlandhai.jpg",
    },
    {
      id: 7,
      name: "Weißspitzen-Riffhai",
      geburtsort: "Korallenriffe im Indo-Pazifik",
      nahrung: "Kleine Fische, Krebstiere, Tintenfische",
      gefahr: "Sehr gering - Scheu und harmlos",
      gewohnheiten:
        "Nachtaktiv, ruht tagsüber in Höhlen, jagt in Gruppen, standorttreu, liebt Korallenriffe",
      image: "/images/sharks/Weißspitzen-Riffhai.jpg",
    },
    {
      id: 8,
      name: "Kurzflossen-Mako",
      geburtsort: "Gemäßigte und tropische Ozeane weltweit",
      nahrung: "Thunfische, Schwertfische, andere Haie",
      gefahr: "Mittel - Kann aggressiv sein wenn provoziert",
      gewohnheiten:
        "Schnellster Hai (bis 60 km/h), springt aus dem Wasser, jagt aktiv, Hochseejäger",
      image: "/images/sharks/Kurzflossen-Mako.jpg",
    },
    {
      id: 9,
      name: "Bullenhai",
      geburtsort: "Küstengewässer und Flussmündungen weltweit",
      nahrung: "Fische, Rochen, andere Haie, Vögel, Delfine",
      gefahr: "Sehr hoch - Extrem aggressiv, häufig in flachem Wasser",
      gewohnheiten:
        "Kann in Süßwasser leben, territorial, aggressiv, jagt in trübem Wasser, kommt oft in Flussnähe",
      image: "/images/sharks/Bullenhai.jpg",
    },
    {
      id: 10,
      name: "Zitronenhai",
      geburtsort: "Subtropische Küstengewässer, Mangrovenwälder",
      nahrung: "Fische, Rochen, Krebstiere, Seevögel",
      gefahr: "Gering - Normalerweise nicht aggressiv",
      gewohnheiten:
        "Sozial, bildet Gruppen, kehrt zu Geburtsstätten zurück, nachtaktiv, intelligent",
      image: "/images/sharks/Zitronenhai.jpg",
    },
    {
      id: 11,
      name: "Riesenhai",
      geburtsort: "Gemäßigte Gewässer weltweit",
      nahrung: "Plankton, kleine Fische",
      gefahr: "Keine - Friedlicher Filtrierer",
      gewohnheiten:
        "Zweitgrößter Hai, schwimmt mit offenem Maul, wandert saisonal, langsam, oft an Oberfläche",
      image: "/images/sharks/Riesenhai.jpg",
    },
    {
      id: 12,
      name: "Schwarzspitzen-Riffhai",
      geburtsort: "Tropische Korallenriffe im Indo-Pazifik",
      nahrung: "Kleine Fische, Tintenfische, Krebstiere",
      gefahr: "Sehr gering - Scheu vor Menschen",
      gewohnheiten:
        "Sehr aktiv, springt manchmal aus dem Wasser, lebt in flachem Wasser, jagt in Gruppen",
      image: "/images/sharks/Schwarzspitzen-Riffhai.jpg",
    },
    {
      id: 13,
      name: "Sandtigerhai",
      geburtsort: "Subtropische und gemäßigte Küsten weltweit",
      nahrung: "Fische, kleinere Haie, Rochen, Tintenfische",
      gefahr: "Gering - Trotz furchteinflößendem Aussehen friedlich",
      gewohnheiten:
        "Schwimmt langsam, schluckt Luft für Auftrieb, nachtaktiv, ruht in Höhlen, gesellig",
      image: "/images/sharks/Sandtigerhai.jpg",
    },
    {
      id: 14,
      name: "Fuchshai",
      geburtsort: "Gemäßigte und tropische Ozeane",
      nahrung: "Kleine Fische (Sardinen, Makrelen), Tintenfische",
      gefahr: "Sehr gering - Scheu und harmlos",
      gewohnheiten:
        "Nutzt langen Schwanz zum Jagen (betäubt Beute), springt aus Wasser, jagt in Gruppen",
      image: "/images/sharks/Fuchshai.jpg",
    },
    {
      id: 15,
      name: "Seidenhai",
      geburtsort: "Tropische Hochseegewässer weltweit",
      nahrung: "Fische, Tintenfische, Krebstiere",
      gefahr: "Mittel - Kann neugierig und hartnäckig sein",
      gewohnheiten:
        "Schneller Schwimmer, folgt Thunfischschwärmen, lebt in großen Tiefen, gesellig",
      image: "/images/sharks/Seidenhai.jpg",
    },
    {
      id: 16,
      name: "Engelhai",
      geburtsort: "Sandige Meeresböden in gemäßigten Gewässern",
      nahrung: "Bodenfische, Krebstiere, Weichtiere",
      gefahr: "Gering - Beißt nur wenn gestört",
      gewohnheiten:
        "Tarnung im Sand, lauert auf Beute, nachtaktiv, flach wie ein Rochen, standorttreu",
      image: "/images/sharks/Engelhai.jpg",
    },
    {
      id: 17,
      name: "Grauer Riffhai",
      geburtsort: "Korallenriffe im Indo-Pazifik",
      nahrung: "Riffische, Tintenfische, Krebstiere",
      gefahr: "Mittel - Territorial, zeigt Drohverhalten",
      gewohnheiten:
        "Sehr territorial, patroulliert Riffkanten, zeigt Drohgebärden, nachtaktiv, bildet Schulen",
      image: "/images/sharks/Grauer Riffhai.jpg",
    },
    {
      id: 18,
      name: "Langflossen-Mako",
      geburtsort: "Tropische und subtropische Ozeane",
      nahrung: "Tintenfische, Fische, Delfine",
      gefahr: "Mittel - Seltener als Kurzflossen-Mako",
      gewohnheiten:
        "Tiefseehai, langsamer als Kurzflossen-Mako, seltener gesehen, große Brustflossen",
      image: "/images/sharks/Langflossen-Mako.jpg",
    },
    {
      id: 19,
      name: "Sechskiemer-Hai",
      geburtsort: "Tiefsee weltweit, gemäßigte Gewässer",
      nahrung: "Fische, andere Haie, Robben, Aas",
      gefahr: "Gering - Lebt meist in großer Tiefe",
      gewohnheiten:
        "Primitiver Hai, sechs Kiemenspalten, nachtaktiv, steigt nachts auf, Tiefseeräuber",
      image: "/images/sharks/Sechskiemer-Hai.jpg",
    },
    {
      id: 20,
      name: "Katzenhai",
      geburtsort: "Küstengewässer und Kontinentalschelf weltweit",
      nahrung: "Kleine Fische, Würmer, Krebstiere",
      gefahr: "Keine - Völlig harmlos",
      gewohnheiten:
        "Nachtaktiv, versteckt sich tagsüber, lebt am Boden, klein und scheu, legt Eier",
      image: "/images/sharks/Katzenhai.jpg",
    },
    {
      id: 21,
      name: "Hornhai",
      geburtsort: "Pazifikküste Nordamerikas",
      nahrung: "Seeigel, Krebstiere, kleine Fische",
      gefahr: "Keine - Harmlos",
      gewohnheiten:
        "Nachtaktiv, versteckt sich in Felsspalten, langsam, kann an Land kriechen, legt spiralförmige Eier",
      image: "/images/sharks/Hornhai.jpg",
    },
    {
      id: 22,
      name: "Galapagos-Hai",
      geburtsort: "Galapagos-Inseln und tropische Inseln",
      nahrung: "Fische, Tintenfische, Seelöwen",
      gefahr: "Mittel bis Hoch - Kann aggressiv sein",
      gewohnheiten:
        "Neugierig, oft bei Inseln, territorial, schwimmt in Gruppen, bevorzugt klares Wasser",
      image: "/images/sharks/Galapagos-Hai.jpeg",
    },
    {
      id: 23,
      name: "Bronzehai",
      geburtsort: "Subtropische Küstengewässer weltweit",
      nahrung: "Fische, Rochen, Tintenfische",
      gefahr: "Mittel - Verwechslungen mit Bullenhai möglich",
      gewohnheiten:
        "Wandert saisonal, bildet große Schulen, springt bei Jagd aus Wasser, bevorzugt trübes Wasser",
      image: "/images/sharks/Bronzehai.jpg",
    },
    {
      id: 24,
      name: "Blaugrauer Hai",
      geburtsort: "Gemäßigte und tropische Küstengewässer",
      nahrung: "Bodenfische, Rochen, Krebstiere",
      gefahr: "Sehr gering - Friedlich",
      gewohnheiten:
        "Lebt am Meeresboden, langsam, wandert in großen Gruppen, bevorzugt sandige Böden",
      image: "/images/sharks/Blaugrauer Hai.jpg",
    },
    {
      id: 25,
      name: "Schwarzhai",
      geburtsort: "Atlantik, Mittelmeer, Pazifik",
      nahrung: "Fische, Tintenfische, Krebstiere",
      gefahr: "Gering - Scheu vor Menschen",
      gewohnheiten:
        "Hochseehai, wandert große Distanzen, lebt in tiefen Gewässern, selten gesehen",
      image: "/images/sharks/Schwarzhai.jpg",
    },
    {
      id: 26,
      name: "Nachthai",
      geburtsort: "Tropische Korallenriffe, Indo-Pazifik",
      nahrung: "Krebstiere, Tintenfische, kleine Fische",
      gefahr: "Keine - Sehr klein und harmlos",
      gewohnheiten:
        "Nachtaktiv, ruht tagsüber in Spalten, sehr klein, gesellig, friedlich",
      image: "/images/sharks/Nachthai.jpg",
    },
    {
      id: 27,
      name: "Weißspitzen-Hochseehai",
      geburtsort: "Tropische und subtropische Ozeane",
      nahrung: "Fische, Tintenfische, Seevögel, Aas",
      gefahr: "Sehr hoch - Extrem gefährlich, besonders bei Schiffswracks",
      gewohnheiten:
        "Folgt Schiffen, oft bei Katastrophen beteiligt, sehr aggressiv, neugierig, langsam aber hartnäckig",
      image: "/images/sharks/Weißspitzen-Hochseehai.jpg",
    },
    {
      id: 28,
      name: "Koboldhai",
      geburtsort: "Tiefsee weltweit",
      nahrung: "Tiefsee-Fische, Tintenfische, Krebstiere",
      gefahr: "Keine - Lebt in extremer Tiefe",
      gewohnheiten:
        "Sehr selten gesehen, ausfahrbarer Kiefer, lebt in 200-1300m Tiefe, pink gefärbt, langsam",
      image: "/images/sharks/Koboldhai.jpg",
    },
    {
      id: 29,
      name: "Riesenmaul-Hai",
      geburtsort: "Tiefsee in tropischen Gewässern",
      nahrung: "Plankton, kleine Fische, Quallen",
      gefahr: "Keine - Filtrierer, sehr selten",
      gewohnheiten:
        "Sehr seltener Tiefseehai, riesiges Maul, filtert Plankton, leuchtendes Maul, steigt nachts auf",
      image: "/images/sharks/Riesenmaul-Hai.jpeg",
    },
    {
      id: 30,
      name: "Dornhai",
      geburtsort: "Gemäßigte und subarktische Gewässer weltweit",
      nahrung: "Kleine Fische, Tintenfische, Krebstiere",
      gefahr: "Sehr gering - Kleine Stacheln können stechen",
      gewohnheiten:
        "Giftige Rückenstacheln, lebt in großen Schwärmen, sehr langlebig (100+ Jahre), wichtiger Speisefisch",
      image: "/images/sharks/Dornhai.jpg",
    },
    {
      id: 31,
      name: "Pazifischer Schlafhai",
      geburtsort: "Nordpazifik, kalte Gewässer",
      nahrung: "Fische, Tintenfische, Aas",
      gefahr: "Sehr gering - Träge und langsam",
      gewohnheiten:
        "Extrem langsam, kann 200+ Jahre alt werden, lebt in Tiefsee, träge, bevorzugt kaltes Wasser",
      image: "/images/sharks/Pazifischer Schlafhai.jpg",
    },
    {
      id: 32,
      name: "Laternhai",
      geburtsort: "Tiefsee weltweit",
      nahrung: "Winzige Fische, Krebstiere, Tintenfische",
      gefahr: "Keine - Winzig klein",
      gewohnheiten:
        "Biolumineszent (leuchtet), kleinster Hai, lebt in extremer Tiefe, nutzt Licht zur Tarnung",
      image: "/images/sharks/Laternhai.jpeg",
    },
    {
      id: 33,
      name: "Zittern-Hai",
      geburtsort: "Küstengewässer Atlantik und Mittelmeer",
      nahrung: "Fische, Krebstiere, Tintenfische",
      gefahr: "Gering - Normalerweise scheu",
      gewohnheiten:
        "Wandert saisonal, lebt in mittleren Tiefen, gesellig, aktiver Jäger",
      image: "/images/sharks/Zittern-Hai.jpg",
    },
    {
      id: 34,
      name: "Karibischer Riffhai",
      geburtsort: "Karibisches Meer, Korallenriffe",
      nahrung: "Riffische, Tintenfische, Rochen",
      gefahr: "Mittel - Kann territorial sein",
      gewohnheiten:
        "Bevorzugt Korallenriffe, territorial, ruht tagsüber, jagt nachts, standorttreu",
      image: "/images/sharks/Karibischer Riffhai.jpg",
    },
    {
      id: 35,
      name: "Australischer Schwarzspitzenhai",
      geburtsort: "Küstengewässer Nordaustralien, Indo-Pazifik",
      nahrung: "Kleine Fische, Krebstiere",
      gefahr: "Sehr gering - Klein und scheu",
      gewohnheiten:
        "Lebt in flachem Wasser, sehr aktiv, springt aus Wasser, gesellig, bevorzugt Mangrovenwälder",
      image: "/images/sharks/Australischer Schwarzspitzenhai.jpg",
    },
    {
      id: 36,
      name: "Spinner-Hai",
      geburtsort: "Tropische und subtropische Küsten weltweit",
      nahrung: "Kleine Fische, Tintenfische",
      gefahr: "Sehr gering - Scheu vor Menschen",
      gewohnheiten:
        "Spektakuläre Sprünge mit Drehungen, jagt in Schulen, schneller Schwimmer, wandert saisonal",
      image: "/images/sharks/Spinner-Hai.jpeg",
    },
    {
      id: 37,
      name: "Atlantischer Scherbenhai",
      geburtsort: "Atlantik, Mittelmeer",
      nahrung: "Kleine Fische, Tintenfische, Krebstiere",
      gefahr: "Keine - Klein und harmlos",
      gewohnheiten:
        "Lebt in mittleren Tiefen, nachtaktiv, selten gesehen, gesellig",
      image: "/images/sharks/Atlantischer Scherbenhai.jpeg",
    },
    {
      id: 38,
      name: "Borneo-Hai",
      geburtsort: "Borneo, Südostasien (Süßwasser)",
      nahrung: "Kleine Fische, Krebstiere",
      gefahr: "Keine - Extrem selten und klein",
      gewohnheiten:
        "Lebt in Flüssen, extrem selten (nur wenige Exemplare bekannt), klein, nachtaktiv",
      image: "/images/sharks/Borneo-Hai.jpeg",
    },
    {
      id: 39,
      name: "Fleckhai",
      geburtsort: "Korallenriffe Indo-Pazifik",
      nahrung: "Kleine Fische, Krebstiere, Würmer",
      gefahr: "Keine - Friedlich und klein",
      gewohnheiten:
        "Nachtaktiv, versteckt sich tagsüber, hübsche Fleckenmusterung, lebt am Boden",
      image: "/images/sharks/Fleckhai.jpg",
    },
    {
      id: 40,
      name: "Pazifischer Engelhai",
      geburtsort: "Pazifikküste, sandige Böden",
      nahrung: "Bodenfische, Tintenfische, Krebstiere",
      gefahr: "Gering - Beißt nur wenn gestört",
      gewohnheiten:
        "Vergräbt sich im Sand, lauert auf Beute, flach wie Rochen, blitzschneller Angriff",
      image: "/images/sharks/Pazifischer Engelhai.jpg",
    },
    {
      id: 41,
      name: "Japanischer Teppichhai",
      geburtsort: "Japanische Küsten, felsige Böden",
      nahrung: "Kleine Fische, Krebstiere, Tintenfische",
      gefahr: "Gering - Kann beißen wenn gestört",
      gewohnheiten:
        "Perfekte Tarnung, lauert bewegungslos, saugt Beute ein, nachtaktiv",
      image: "/images/sharks/Japanischer Teppichhai.jpeg",
    },
    {
      id: 42,
      name: "Zebrahai",
      geburtsort: "Indo-Pazifik, Korallenriffe",
      nahrung: "Weichtiere, Krebstiere, kleine Fische",
      gefahr: "Keine - Sehr friedlich",
      gewohnheiten:
        "Wunderschöne Musterung, sehr friedlich, liegt oft am Boden, nachtaktiv, beliebt bei Tauchern",
      image: "/images/sharks/Zebrahai.jpg",
    },
    {
      id: 43,
      name: "Ammenhai",
      geburtsort: "Tropische Küsten, Karibik, Atlantik",
      nahrung: "Krebstiere, Tintenfische, Fische",
      gefahr: "Sehr gering - Friedlich, beißt nur wenn belästigt",
      gewohnheiten:
        "Ruht tagsüber in Gruppen, saugt Beute vom Boden, sehr friedlich, nachtaktiv",
      image: "/images/sharks/Ammenhai.jpg",
    },
    {
      id: 44,
      name: "Bambushai",
      geburtsort: "Indo-Pazifik, Korallenriffe",
      nahrung: "Kleine Fische, Krebstiere, Würmer",
      gefahr: "Keine - Völlig harmlos",
      gewohnheiten:
        "Sehr klein, schlank, nachtaktiv, versteckt sich in Spalten, kann an Land überleben",
      image: "/images/sharks/Bambushai.jpeg",
    },
    {
      id: 45,
      name: "Sägerochen",
      geburtsort: "Tropische und subtropische Küsten",
      nahrung: "Fische, Krebstiere",
      gefahr: "Gering - Säge kann gefährlich sein",
      gewohnheiten:
        "Nutzt Säge zum Wühlen und Betäuben, lebt am Boden, bedroht durch Überfischung",
      image: "/images/sharks/Sägerochen.jpg",
    },
    {
      id: 46,
      name: "Kragenhai",
      geburtsort: "Tiefsee weltweit",
      nahrung: "Tintenfische, Fische",
      gefahr: "Keine - Lebt in extremer Tiefe",
      gewohnheiten:
        "Lebender Fossil (300 Mio Jahre alt), aalähnlicher Körper, sehr selten gesehen, bizarre Form",
      image: "/images/sharks/Kragenhai.jpeg",
    },
    {
      id: 47,
      name: "Megamaul-Hai",
      geburtsort: "Verschiedene Tiefsee-Regionen",
      nahrung: "Plankton, Quallen, kleine Fische",
      gefahr: "Keine - Filtrierer",
      gewohnheiten:
        "Erst 1976 entdeckt, sehr selten, riesiges Maul, filtert Plankton, lebt in Tiefsee",
      image: "/images/sharks/Megamaul-Hai.jpeg",
    },
    {
      id: 48,
      name: "Grönland-Eishai",
      geburtsort: "Arktis, Nordatlantik (extrem kalte Gewässer)",
      nahrung: "Fische, Robben, Rentiere, Aas",
      gefahr: "Sehr gering - Extrem langsam, lebt in Tiefe",
      gewohnheiten:
        "Ältestes Wirbeltier (500+ Jahre), extrem langsam, giftiges Fleisch, lebt in eiskaltem Wasser, fast blind",
      image: "/images/sharks/Grönland-Eishai.jpeg",
    },
  ];

  return (
    <div className="shark-details-container">
      <h1 className="details-title">Über Haie - Detaillierte Informationen</h1>
      <p className="details-intro">
        Entdecke faszinierende Details über alle 48 Haiarten in unserer
        Sammlung. Erfahre mehr über ihre Herkunft, Ernährung, Gefährlichkeit und
        Verhaltensweisen.
      </p>

      <div className="shark-info-grid">
        {sharkInfo.map((shark) => (
          <div key={shark.id} className="shark-info-card">
            <div className="shark-info-header">
              <img
                src={shark.image}
                alt={shark.name}
                className="shark-info-image"
              />
              <h2 className="shark-info-name">{shark.name}</h2>
            </div>

            <div className="shark-info-content">
              <div className="info-section">
                <h3>🌍 Geburtsort</h3>
                <p>{shark.geburtsort}</p>
              </div>

              <div className="info-section">
                <h3>🍽️ Nahrung</h3>
                <p>{shark.nahrung}</p>
              </div>

              <div className="info-section">
                <h3>⚠️ Gefährlichkeit</h3>
                <p>{shark.gefahr}</p>
              </div>

              <div className="info-section">
                <h3>🦈 Gewohnheiten</h3>
                <p>{shark.gewohnheiten}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharkDetails;
