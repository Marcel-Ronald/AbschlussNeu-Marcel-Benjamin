// Filter-Logik für Haie
export const dangerousSharkNames = [
  "Weißer Hai",
  "Tigerhai",
  "Bullenhai",
  "Weißspitzen-Hochseehai",
  "Galapagos-Hai",
  "Grauer Riffhai",
  "Hammerhai",
  "Kurzflossen-Mako",
  "Bronzehai",
  "Schwarzspitzen-Riffhai",
];

export const filterSharks = (sharks, filterType, searchTerm = "") => {
  let filtered = [...sharks];

  // Suchfilter
  if (searchTerm) {
    filtered = filtered.filter(
      (shark) =>
        shark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shark.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sortier- und Typ-Filter
  switch (filterType) {
    case "danger-desc":
      // Nach Gefährlichkeit absteigend sortieren
      filtered = filtered.sort((a, b) => {
        const getDangerLevel = (gefahr) => {
          if (!gefahr) return 0;
          const lower = gefahr.toLowerCase();
          if (lower.includes('sehr gefährlich') || lower.includes('extrem gefährlich')) return 5;
          if (lower.includes('potenziell gefährlich') || lower.includes('gefährlich')) return 4;
          if (lower.includes('mäßig')) return 3;
          if (lower.includes('gering')) return 2;
          if (lower.includes('harmlos') || lower.includes('nicht gefährlich')) return 1;
          return 0;
        };
        return getDangerLevel(b.gefahr) - getDangerLevel(a.gefahr);
      });
      break;
    
    case "danger-asc":
      // Nach Gefährlichkeit aufsteigend sortieren
      filtered = filtered.sort((a, b) => {
        const getDangerLevel = (gefahr) => {
          if (!gefahr) return 0;
          const lower = gefahr.toLowerCase();
          if (lower.includes('sehr gefährlich') || lower.includes('extrem gefährlich')) return 5;
          if (lower.includes('potenziell gefährlich') || lower.includes('gefährlich')) return 4;
          if (lower.includes('mäßig')) return 3;
          if (lower.includes('gering')) return 2;
          if (lower.includes('harmlos') || lower.includes('nicht gefährlich')) return 1;
          return 0;
        };
        return getDangerLevel(a.gefahr) - getDangerLevel(b.gefahr);
      });
      break;
    
    case "length-desc":
      // Nach Länge absteigend sortieren
      filtered = filtered.sort((a, b) => b.average_length_m - a.average_length_m);
      break;
    
    case "length-asc":
      // Nach Länge aufsteigend sortieren
      filtered = filtered.sort((a, b) => a.average_length_m - b.average_length_m);
      break;
    
    case "weight-desc":
      // Nach Gewicht absteigend sortieren
      filtered = filtered.sort((a, b) => b.average_weight_kg - a.average_weight_kg);
      break;
    
    case "weight-asc":
      // Nach Gewicht aufsteigend sortieren
      filtered = filtered.sort((a, b) => a.average_weight_kg - b.average_weight_kg);
      break;
    
    case "lifespan-desc":
      // Nach Lebensdauer absteigend sortieren
      filtered = filtered.sort((a, b) => b.lifespan_years - a.lifespan_years);
      break;
    
    case "lifespan-asc":
      // Nach Lebensdauer aufsteigend sortieren
      filtered = filtered.sort((a, b) => a.lifespan_years - b.lifespan_years);
      break;
    
    case "name-asc":
      // Alphabetisch A-Z
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    
    case "name-desc":
      // Alphabetisch Z-A
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    
    default:
      // Keine Filterung, nur Sortierung nach Name A-Z als Standard
      if (!searchTerm) {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
      break;
  }

  return filtered;
};
