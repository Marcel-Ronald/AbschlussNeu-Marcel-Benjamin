import React, { useState } from "react";
import { sharks } from "./data/sharks";
import SearchBar from "./components/SearchBar";
import SharkList from "./components/SharkList";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState("home");

  const filteredSharks = sharks.filter(
    (shark) =>
      shark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shark.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo">Shark Wiki 🦈</h1>
        </div>

        <div className="navbar-center">
          <h2 className="welcome">Welcome to Shark Wiki</h2>
          <ul className="nav-links">
            <li onClick={() => setActivePage("home")}>Home</li>
            <li onClick={() => setActivePage("about")}>About Sharks</li>
            <li onClick={() => setActivePage("gallery")}>Gallery</li>
          </ul>
        </div>

        <div className="navbar-right">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </nav>

      {/* Page content */}
      {activePage === "home" && null}
      {activePage === "about" && (
        <p className="page-text">
          Haie sind für die Gesundheit der Ozeane und das Gleichgewicht der
          Meeresökosysteme unverzichtbar. Sie regulieren Populationen anderer
          Arten, indem sie kranke oder schwache Tiere jagen, und tragen so zur
          Vitalität der Beutetiere bei...
        </p>
      )}
      {activePage === "gallery" && <SharkList sharks={filteredSharks} />}
    </div>
  );
};

export default App;
