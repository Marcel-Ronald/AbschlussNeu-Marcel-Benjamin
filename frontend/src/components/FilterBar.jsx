import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const FilterBar = ({ sharks, filterType, onFilterChange }) => {
  const { t } = useLanguage();
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { id: "name-asc", label: t("Name A-Z", "Name A-Z"), icon: "🔤" },
    { id: "name-desc", label: t("Name Z-A", "Name Z-A"), icon: "🔤" },
    { id: "danger-desc", label: t("Gefährlichkeit (hoch → niedrig)", "Danger (high → low)"), icon: "⚠️" },
    { id: "danger-asc", label: t("Gefährlichkeit (niedrig → hoch)", "Danger (low → high)"), icon: "⚠️" },
    { id: "length-desc", label: t("Länge (groß → klein)", "Length (large → small)"), icon: "📏" },
    { id: "length-asc", label: t("Länge (klein → groß)", "Length (small → large)"), icon: "📏" },
    { id: "weight-desc", label: t("Gewicht (schwer → leicht)", "Weight (heavy → light)"), icon: "⚖️" },
    { id: "weight-asc", label: t("Gewicht (leicht → schwer)", "Weight (light → heavy)"), icon: "⚖️" },
    { id: "lifespan-desc", label: t("Lebensdauer (lang → kurz)", "Lifespan (long → short)"), icon: "⏳" },
    { id: "lifespan-asc", label: t("Lebensdauer (kurz → lang)", "Lifespan (short → long)"), icon: "⏳" },
  ];

  const isSortOption = sortOptions.some(opt => opt.id === filterType);
  const activeSortLabel = sortOptions.find(opt => opt.id === filterType)?.label || t("Sortieren", "Sort");

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
        <span className="filter-label">{t("Alle Haie", "All Sharks")}</span>
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
