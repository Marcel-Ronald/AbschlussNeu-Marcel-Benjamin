import React, { useState } from "react";

const FilterBar = ({ sharks, filterType, onFilterChange }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { id: "name-asc", label: "Name A-Z", icon: "🔤" },
    { id: "name-desc", label: "Name Z-A", icon: "🔤" },
    { id: "danger-desc", label: "Gefährlichkeit (hoch → niedrig)", icon: "⚠️" },
    { id: "danger-asc", label: "Gefährlichkeit (niedrig → hoch)", icon: "⚠️" },
    { id: "length-desc", label: "Länge (groß → klein)", icon: "📏" },
    { id: "length-asc", label: "Länge (klein → groß)", icon: "📏" },
    { id: "weight-desc", label: "Gewicht (schwer → leicht)", icon: "⚖️" },
    { id: "weight-asc", label: "Gewicht (leicht → schwer)", icon: "⚖️" },
    { id: "lifespan-desc", label: "Lebensdauer (lang → kurz)", icon: "⏳" },
    { id: "lifespan-asc", label: "Lebensdauer (kurz → lang)", icon: "⏳" },
  ];

  const isSortOption = sortOptions.some(opt => opt.id === filterType);
  const activeSortLabel = sortOptions.find(opt => opt.id === filterType)?.label || "Sortieren";

  return (
    <div className="filter-bar">
      {/* Alle Button */}
      <button
        className={`filter-button ${
          filterType === null || !isSortOption ? "active" : ""
        }`}
        onClick={() => onFilterChange(null)}
      >
        <span className="filter-icon">🦈</span>
        <span className="filter-label">Alle Haie</span>
        <span className="filter-badge">{sharks.length}</span>
      </button>
      
      {/* Sortier-Dropdown */}
      <div className="sort-dropdown">
        <button
          className={`filter-button sort-button ${isSortOption ? "active" : ""}`}
          onClick={() => setShowSortMenu(!showSortMenu)}
        >
          <span className="filter-icon">📊</span>
          <span className="filter-label">{activeSortLabel}</span>
          <span className="dropdown-arrow">{showSortMenu ? "▲" : "▼"}</span>
        </button>
        
        {showSortMenu && (
          <div className="sort-menu">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                className={`sort-option ${filterType === option.id ? "active" : ""}`}
                onClick={() => {
                  onFilterChange(option.id);
                  setShowSortMenu(false);
                }}
              >
                <span className="filter-icon">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
