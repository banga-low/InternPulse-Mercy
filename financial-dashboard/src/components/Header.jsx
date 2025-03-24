import React from "react";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <h1 className="dashboard-title">📊 Financial Dashboard</h1>
      <div className="header-controls">
        <SearchBar onSearch={onSearch} />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
