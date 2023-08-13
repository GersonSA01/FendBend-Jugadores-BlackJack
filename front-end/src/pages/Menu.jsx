import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4 w-screen">
      <ul className="flex justify-around">
        <li className="px-4">
          <Link
            to="/"
            className="text-white text-lg px-2 py-2 rounded hover:bg-gray-700"
          >
            Inicio
          </Link>
        </li>
        <li className="px-4">
          <Link
            to="/juego"
            className="text-white text-lg px-2 py-2 rounded hover:bg-gray-700 "
          >
            Juego
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


