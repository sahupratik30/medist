import React from "react";
import logoAlt from "../assets/images/logo-alt.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-8 sm:min-h-[400px] sm:py-16">
      <div className="container grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-8 md:col-span-3 lg:col-span-2">
          <img
            src={logoAlt}
            className="w-24 xs:w-28 md:w-32"
            alt="medist text written in light grey color"
          />

          <p className="max-w-sm text-sm text-white xs:text-base s:text-justify">
            Medist is a one-stop solution for all your healthcare needs where
            you get delivery of all kinds of medicines across the country.
          </p>

          <div className="flex items-center gap-4">
            <a href="#">
              <i className="fa-lg fa-brands fa-facebook-f flex aspect-square w-12 items-center justify-center rounded-full bg-primary text-white" />
            </a>

            <a href="#">
              <i className="fa-lg fa-brands fa-instagram flex aspect-square w-12 items-center justify-center rounded-full bg-primary text-white" />
            </a>

            <a href="#">
              <i className="fa-lg fa-brands fa-twitter flex aspect-square w-12 items-center justify-center rounded-full bg-primary text-white" />
            </a>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className="w-max text-lg font-semibold text-primary xs:text-xl md:text-2xl">
            Links
          </h2>

          <ul className="mt-4 flex flex-col gap-2 text-sm text-white xs:text-base">
            <li className="transition hover:text-[#5c945b]">
              <Link to="/">Home</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/about">About</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className="w-max text-lg font-semibold text-primary xs:text-xl md:text-2xl">
            All Categories
          </h2>

          <ul className="mt-4 flex flex-col gap-2 text-sm text-white xs:text-base">
            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=LUNG_CARE">Lung Care</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=LIVER_CARE">Liver Care</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=STOMACH_CARE">Stomach Care</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=HEART_CARE">Heart Care</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=COLD_AND_FEVER">
                Cold And Fever
              </Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=DIABETES_CARE">Diabetes Care</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=EYE_CARE">Eye Care</Link>
            </li>

            <li className="transition hover:text-[#5c945b]">
              <Link to="/products?category=BONE_AND_JOINT_PAIN">
                Bone and Joint Pain
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className="w-max text-lg font-semibold text-primary xs:text-xl md:text-2xl">
            Get In Touch
          </h2>

          <p className="mt-4 text-sm text-white xs:text-base">
            Plot No. - 16/18, Near Infocity Square, Bhubaneswar, Patia - 751024
          </p>

          <p className="mt-8 text-sm text-white xs:text-base">
            E-mail : contact@medist.com
          </p>

          <p className="mt-2 text-sm text-white xs:text-base">
            Ph : +917608998089
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
