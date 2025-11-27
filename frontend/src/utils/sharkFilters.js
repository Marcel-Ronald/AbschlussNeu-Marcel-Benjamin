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
  let filtered = sharks;

  // Suchfilter
  if (searchTerm) {
    filtered = filtered.filter(
      (shark) =>
        shark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shark.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Typ-Filter
  if (filterType === "dangerous") {
    filtered = sharks
      .filter((shark) => dangerousSharkNames.includes(shark.name))
      .slice(0, 10);
  } else if (filterType === "large") {
    filtered = [...sharks]
      .sort((a, b) => {
        const sizeA = parseFloat(
          a.description.match(/(\d+\.?\d*)\s*m/)?.[1] || 0
        );
        const sizeB = parseFloat(
          b.description.match(/(\d+\.?\d*)\s*m/)?.[1] || 0
        );
        return sizeB - sizeA;
      })
      .slice(0, 10);
  } else if (filterType === "deep") {
    filtered = sharks.filter(
      (shark) =>
        shark.description.toLowerCase().includes("tiefsee") ||
        shark.name.includes("Koboldhai") ||
        shark.name.includes("Laternhai") ||
        shark.name.includes("Sechskiemer") ||
        shark.name.includes("Riesenmaul")
    );
  } else if (filterType === "filter") {
    filtered = sharks.filter(
      (shark) =>
        shark.name.includes("Walhai") ||
        shark.name.includes("Riesenhai") ||
        shark.name.includes("Riesenmaul")
    );
  }

  return filtered;
};
