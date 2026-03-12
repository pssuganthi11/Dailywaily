import React, { useState,useEffect } from "react";
import logo from "../assets/image/logo.png";
import Profile from "../assets/image/profile.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);


  const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  setCartCount(totalQuantity);
};

useEffect(() => {
  updateCartCount();

  // listen when cart updates
  window.addEventListener("cartUpdated", updateCartCount);

  return () => {
    window.removeEventListener("cartUpdated", updateCartCount);
  };
}, []);

  return (
    <nav className="bg-white shadow-md relative w-full">
      <header className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* for logo */}
        <div className="flex items-center gap-2">
          <div className="w-10">
            <img
              src={logo}
              alt="logo"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-gray-800 text-lg uppercase tracking-tight">
              Daily <span className="text-yellow-500">Waily</span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium italic">
              For the people by the people
            </span>
          </div>
        </div>

        {/*for  Nav */}
        <div
          className={`
          absolute lg:static top-[56px] left-0 w-full lg:w-auto bg-white lg:bg-transparent
          flex-col lg:flex-row flex items-center transition-all duration-300 ease-in-out
          z-50 border-b lg:border-none shadow-lg lg:shadow-none
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto lg:flex"}
        `}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-6 lg:p-0 w-full lg:w-auto text-center">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-600 font-medium block w-full py-2 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-yellow-600 font-medium block w-full py-2"
              >
                Category
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-yellow-600 font-medium block w-full py-2"
              >
                Search
              </a>
            </li>
          </ul>
        </div>

        {/* for Right Side Icons */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Cart Icon  */}
          <Link to="/cart">
            <div className="flex items-center space-x-1 cursor-pointer group">
              <div className="relative p-2 rounded-full transition-colors group-hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current text-gray-700 group-hover:text-yellow-500"
                >
                  <path d="M4.005 16V4h-2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8.005V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5.004a1 1 0 0 1-1-1m2 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4m12 0a2 2 0 1 1 0-4a2 2 0 0 1 0 4" />
                </svg>

                {/* Cart Badge for item count */}
                <span className="absolute top-0 right-0 bg-yellow-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              </div>

              <span className="hidden md:inline font-medium text-sm text-gray-700 group-hover:text-yellow-500">
                  Cart

              </span>
            </div>
          </Link>

          <div className="w-10 h-10 border-2 border-gray-200 rounded-full bg-gray-100 overflow-hidden cursor-pointer hover:border-blue-400 transition flex items-center justify-center">
            <img
              src={Profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hamburger Menu Icon */}
          <button
            className="lg:hidden text-2xl p-1 focus:outline-none hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="currentColor"
                    d="M2.22 2.22a.75.75 0 0 1 1.06 0L6 4.939L8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6L9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061L3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6L2.22 3.28a.75.75 0 0 1 0-1.06"
                  />
                </svg>
              </div>
            ) : (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
