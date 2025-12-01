import React from "react";
import { dangerousSharkNames } from "../utils/sharkFilters";

const FilterBar = ({ sharks, filterType, onFilterChange }) => {
  // Berechne Anzahl für jeden Filter
  const counts = {
    all: sharks.length,
    dangerous: sharks.filter((shark) =>
      dangerousSharkNames.includes(shark.name)
    ).length,
    large: Math.min(sharks.length, 10),
    deep: sharks.filter(
      (shark) =>
        shark.description.toLowerCase().includes("tiefsee") ||
        shark.name.includes("Koboldhai") ||
        shark.name.includes("Laternhai")
    ).length,
    filter: sharks.filter(
      (shark) =>
        shark.name.includes("Walhai") ||
        shark.name.includes("Riesenhai") ||
        shark.name.includes("Riesenmaul")
    ).length,
  };

  const filters = [
    { id: null, label: "Alle", icon: "🦈", count: counts.all },
    {
      id: "dangerous",
      label: "Gefährlichste",
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
