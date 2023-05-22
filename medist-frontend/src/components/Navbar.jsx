import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Button from "./UI/Button";
import MobileMenu from "./MobileMenu";
import { resetAuthData } from "../redux/slices/auth-slice";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const totalCartItems = useSelector((state) => state?.cart?.totalQuantity);
  const { accessToken, user } = useSelector((state) => state?.auth || {});

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <header className="sticky top-0 z-20 bg-white py-3">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="medist text written in dark grey color"
            className="w-24 xs:w-28 md:w-32"
          />
        </Link>

        <nav>
          <ul className="hidden items-center gap-5 text-sm xs:text-base lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "transition duration-200 hover:text-primary"
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
                    : "transition duration-200 hover:text-primary"
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
                    : "transition duration-200 hover:text-primary"
                }
              >
                PRODUCTS
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-8">
          {/* {accessToken && (
            <p className="text-sm font-medium text-primary xs:text-base">
              Welcome, <span>{user?.username?.split(" ")[0]}</span>
            </p>
          )} */}

          <div className="hidden items-center gap-8 lg:flex">
            <Link to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping fa-lg" />
              <small className="absolute -right-2 -top-2 flex aspect-square h-4 w-5 items-center justify-center rounded-lg bg-light-red text-white">
                {totalCartItems}
              </small>
            </Link>

            {!accessToken ? (
              <Button
                className="primary-btn"
                onClick={() => navigate("/signin")}
              >
                <i className="fa-solid fa-circle-user fa-lg" /> Sign In
              </Button>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>

        <i
          className="fa-solid fa-bars fa-lg block text-primary lg:hidden"
          onClick={_toggleMobileMenu}
        />
      </div>

      <MobileMenu
        onClose={() => setShowMobileMenu(false)}
        className={!showMobileMenu ? "translate-x-[110%]" : ""}
      />
    </header>
  );
};

export default Navbar;
