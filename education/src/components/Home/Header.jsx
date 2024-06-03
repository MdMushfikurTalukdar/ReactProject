// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative bg-[#E5E7EB] shadow-md text-white uppercase p-1 flex  justify-between items-center">
      <div className="h-20 hidden md:block w-20">
        <img
          className="h-full w-full rounded-full object-cover object-center"
          src="https://media.istockphoto.com/id/1909564215/photo/e-learning-graduate-certificate-program-concept.webp?b=1&s=170667a&w=0&k=20&c=-zf7lR1kUVR4qpHiWo7DbDmm3rcXj2Q0t1R5bxEWiM4="
          alt=""
        />{" "}
      </div>
      <div className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? (
          <XIcon className="h-10 w-10" />
        ) : (
          <MenuIcon className="h-10 w-10" />
        )}
      </div>
      <nav
        className={` bg-[#E5E7EB] p-6 flex flex-col items-center text-3xl md:text-xl space-y-4 md:space-y-0 md:relative md:flex-row md:space-x-4 ${
          isMenuOpen ? "flex" : "hidden"
        } md:block`}
      >
        <Link to="/dashboard" className="hover:underline text-xl text-black   no-underline" onClick={toggleMenu}>
          Dashboard
        </Link>
        <Link
          to="/about"
          className="hover:underline text-black  no-underline text-xl"
          onClick={toggleMenu}
        >
          About
        </Link>
        
        <Link
          to="/contact"
          className="hover:underline  text-black no-underline  text-xl"
          onClick={toggleMenu}
        >
          Contact
        </Link>
        <Link
          to="/login"
          className="hover:underline text-black no-underline   text-xl"
          onClick={toggleMenu}
        >
          Login
        </Link>
      
      </nav>
    </header>
  );
};