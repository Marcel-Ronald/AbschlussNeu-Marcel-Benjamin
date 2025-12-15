import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const { t, language } = useLanguage();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allSharks, setAllSharks] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Load all sharks for autocomplete
    const fetchSharks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/sharks/all`);
        if (response.ok) {
          const data = await response.json();
          setAllSharks(data.map((shark) => shark.name));
        }
      } catch (err) {
        console.error("Error loading sharks for autocomplete:", err);
      }
    };
    fetchSharks();
  }, []);

  useEffect(() => {
    // Debounced autocomplete
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        const filtered = allSharks
          .filter((shark) =>
            shark.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, allSharks]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      console.log("Suche nach:", searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const selectSuggestion = (shark) => {
    setSearchTerm(shark);
    setShowSuggestions(false);
  };

  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        placeholder={t("Suche nach Haien...", "Search for sharks...")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-bar"
      />
      <button
        className="search-button"
        onClick={handleSearch}
        aria-label="Suchen"
      >
        🔍
      </button>

      {showSuggestions && (
        <div className="autocomplete-dropdown">
          {suggestions.map((shark, index) => (
            <div
              key={index}
              className="autocomplete-item"
              onClick={() => selectSuggestion(shark)}
            >
              {highlightMatch(shark)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
