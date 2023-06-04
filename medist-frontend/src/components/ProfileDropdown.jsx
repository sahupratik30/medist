import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../assets/images/user-icon.svg";
import { resetAuthData } from "../redux/slices/auth-slice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state?.auth || {});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to logout user
  const _onLogout = () => {
    dispatch(resetAuthData());
    navigate("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white p-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200">
          <img src={userIcon} className="w-7" alt="" />
          {/* <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none lg:right-0">
          <div className="py-1">
            <Menu.Item>
              <p
                className={
                  "pointer-events-none block select-none px-4 py-2 text-sm text-gray-700"
                }
              >
                Signed in as {user?.email}
              </p>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/orders"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  View Orders
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? "bg-gray-100 text-red-600" : "text-red-600",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                  onClick={() => _onLogout()}
                >
                  Sign out
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
