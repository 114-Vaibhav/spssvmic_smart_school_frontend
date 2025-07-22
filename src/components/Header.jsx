import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="/vblogo.png"
            alt="SPSSVMIC Logo"
            className="h-16 w-16 mr-3"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Shri Pal Singh Saraswati Vidya Mandir Inter College
            </h1>
            <p className="text-sm">Affiliated to UP Board, Estd. 2004</p>
          </div>
        </div>

        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center space-x-1 md:space-x-4">
            <li>
              <Link
                to="/"
                className="px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                About College
              </Link>
            </li>
            <li>
              <Link
                to="/academic"
                className="px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                Academic
              </Link>
            </li>
            <li>
              <Link
                to="/faculty"
                className="px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                Faculty
              </Link>
            </li>
            <li>
              <Link
                to="/admission"
                className="px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                Admission
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
