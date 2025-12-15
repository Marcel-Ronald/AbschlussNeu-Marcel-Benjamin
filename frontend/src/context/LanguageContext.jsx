import React, { createContext, useState, useContext } from "react";
import { translations, getTranslation } from "../utils/translations";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'de';
  }); // 'de' oder 'en'

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === "de" ? "en" : "de";
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  // Einfache Übersetzungsfunktion für direkte Texte
  const t = (de, en) => {
    return language === "de" ? de : en;
  };

  // Übersetzungsfunktion mit Pfad (z.B. "nav.home")
  const translate = (path) => {
    return getTranslation(path, language);
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t, translate, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
