import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
      
      <div>
        <Link to="/">Home</Link> |  
        <Link to="/crypto">Crypto</Link> |  
        <Link to="/stocks">Stocks</Link>
      </div>
    </nav>
  );
};

export default Navbar;
