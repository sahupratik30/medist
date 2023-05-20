import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Button from "./UI/Button";
import MobileMenu from "./MobileMenu";
import { resetAuthData } from "../redux/slices/auth-slice";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const totalCartItems = useSelector((state) => state?.cart?.totalQuantity);
  const { accessToken, user } = useSelector((state) => state?.auth || {});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = user?.name;

  // function to toggle mobile menu
  const _toggleMobileMenu = () => {
    setShowMobileMenu(true);
  };

  // function to handle logout
  const _handleLogout = () => {
    dispatch(resetAuthData());
  };

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
          <ul className="hidden lg:flex items-center gap-5 text-sm xs:text-base">
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

        <div className="flex items-center gap-8">
          {accessToken && (
            <p className="text-primary font-medium text-sm xs:text-base">
              Welcome, <span>{userName?.split(" ")[0]}</span>
            </p>
          )}

          <div className="hidden lg:flex gap-8 items-center">
            <Link to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
              <small className="absolute bg-light-red aspect-square text-white -top-2 -right-2 rounded-lg flex justify-center items-center w-5 h-4">
                {totalCartItems}
              </small>
            </Link>

            {!accessToken ? (
              <Button
                className="primary-btn"
                onClick={() => navigate("/signin")}
              >
                <i className="fa-solid fa-circle-user fa-lg"></i> Sign In
              </Button>
            ) : (
              <Button className="primary-btn" onClick={_handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>

        <i
          className="fa-solid fa-bars fa-lg text-primary lg:hidden block"
          onClick={_toggleMobileMenu}
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
