import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import Button from "../UI/Button";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const totalCartItems = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/signin");
  }
  function toggleMobileMenu() {
    setShowMobileMenu(true);
  }
  const activeClassName = "text-primary";
  return (
    <header className="bg-white py-3 sticky top-0 z-20">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="medist text written in dark grey color"
            className="w-24 xs:w-28 md:w-32"
          />
        </Link>
        <nav>
          <ul className="hidden md:flex items-center gap-5 text-sm xs:text-base">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "hover:text-primary transition duration-200"
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "hover:text-primary transition duration-200"
                }
              >
                ABOUT
              </NavLink>
            </li>
            <li className="cursor-pointer flex items-center gap-1">
              <NavLink to="/products/category">
                CATEGORIES <i className="fa-solid fa-angle-down"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "hover:text-primary transition duration-200"
                }
              >
                PRODUCTS
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex gap-12 items-center">
          <Link to="/cart" className="relative">
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
            <small className="absolute bg-light-red aspect-square text-white -top-2 -right-2 rounded-lg flex justify-center items-center w-5 h-4">
              {totalCartItems}
            </small>
          </Link>
          <Button className="primary-btn" onClick={handleClick}>
            <i className="fa-solid fa-circle-user fa-lg"></i> Sign In
          </Button>
        </div>
        <i
          className="fa-solid fa-bars fa-lg text-primary md:hidden block"
          onClick={toggleMobileMenu}
        ></i>
      </div>
      <MobileMenu
        onClose={() => setShowMobileMenu(false)}
        className={!showMobileMenu ? "translate-x-[110%]" : ""}
      />
    </header>
  );
}

export default Navbar;
