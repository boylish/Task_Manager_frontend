// Navbar.jsx
import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({ title, onToggleSidebar }) => {
  return (
    <header className="mb-6 flex  items-center flex-wrap">
      <div className="flex items-center gap-4">
        <button className="sm:hidden text-xl" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <h1 className="text-2xl font-semibold">{title}</h1>
        
      </div>
      
    </header>
  );
};

export default Navbar;