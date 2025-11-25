import React from "react";

const FilterBar = ({ sharks, filterType, onFilterChange }) => {
  // Calculate counts for each filter type
  const dangerousSharkNames = [
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

  const deepSeaSharks = ["Koboldhai", "Laternhai", "Sechskiemer", "Riesenmaul"];

  const filterSharks = ["Walhai", "Riesenhai", "Riesenmaul"];

  const counts = {
    all: sharks.length,
    dangerous: sharks.filter((shark) =>
      dangerousSharkNames.includes(shark.name)
    ).length,
    large: sharks.length >= 10 ? 10 : sharks.length,
    deep: sharks.filter(
      (shark) =>
        shark.description.toLowerCase().includes("tiefsee") ||
        deepSeaSharks.some((name) => shark.name.includes(name))
    ).length,
    filter: sharks.filter((shark) =>
      filterSharks.some((name) => shark.name.includes(name))
    ).length,
  };

  const filters = [
    { id: null, label: "Alle Haie", icon: "🦈", count: counts.all },
    {
      id: "dangerous",
      label: "Gefährliche",
      icon: "⚠️",
      count: counts.dangerous,
    },
    { id: "large", label: "Größte", icon: "📏", count: counts.large },
    { id: "deep", label: "Tiefsee", icon: "🌊", count: counts.deep },
    { id: "filter", label: "Filtrierer", icon: "🍽️", count: counts.filter },
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.id || "all"}
          className={`filter-button ${
            filterType === filter.id ? "active" : ""
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          <span className="filter-icon">{filter.icon}</span>
          <span className="filter-label">{filter.label}</span>
          <span className="filter-badge">{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
