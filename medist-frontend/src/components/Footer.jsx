import React from "react";
import logoAlt from "../assets/logo-alt.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="sm:min-h-[400px] py-8 sm:py-16 bg-black">
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="flex flex-col gap-8 col-span-2 md:col-span-3 lg:col-span-2">
          <img
            src={logoAlt}
            className="w-24 xs:w-28 md:w-32"
            alt="medist text written in light grey color"
          />
          <p className="text-white text-sm xs:text-base s:text-justify max-w-sm">
            Medist is a one-stop solution for all your healthcare needs where
            you get delivery of all kinds of medicines across the country.
          </p>
          <div className="flex items-center gap-4">
            <a href="#">
              <i className="fa-lg text-white bg-primary aspect-square w-12 flex items-center justify-center rounded-full fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-lg text-white bg-primary aspect-square w-12 flex items-center justify-center rounded-full fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-lg text-white bg-primary aspect-square w-12 flex items-center justify-center rounded-full fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-lg w-max xs:text-xl md:text-2xl font-semibold text-dark-grey">
            Links
          </h2>
          <hr className="w-12" />
          <ul className="mt-4 flex flex-col gap-2 text-white text-sm xs:text-base">
            <li>
              <Link to="/">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                About
              </Link>
            </li>
            <li>
              <Link to="/products">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-lg w-max xs:text-xl md:text-2xl font-semibold text-dark-grey">
            All Categories
          </h2>
          <hr className="w-12" />
          <ul className="mt-4 flex flex-col gap-2 text-white text-sm xs:text-base">
            <li>
              <Link to="/products/lung-care">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Lung Care
              </Link>
            </li>
            <li>
              <Link to="/products/liver-care">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Liver Care
              </Link>
            </li>
            <li>
              <Link to="/products/stomach-care">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Stomach Care
              </Link>
            </li>
            <li>
              <Link to="/products/heart-care">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Heart Care
              </Link>
            </li>
            <li>
              <Link to="/products/cold-and-fever">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Cold And Fever
              </Link>
            </li>
            <li>
              <Link to="/products/diabetes-care">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Diabetes Care
              </Link>
            </li>
            <li>
              <Link to="/products/eye-care">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Eye Care
              </Link>
            </li>
            <li>
              <Link to="/products/bone-and-joint-pain">
                <i className="text-primary fa-solid fa-angle-right mr-2"></i>
                Bone and Joint Pain
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-lg w-max xs:text-xl md:text-2xl font-semibold text-dark-grey">
            Get In Touch
          </h2>
          <hr className="w-12" />
          <p className="text-sm xs:text-base text-white mt-4">
            Plot No. - 16/18, Near Infocity Square, Bhubaneswar, Patia - 751024
          </p>
          <p className="text-sm xs:text-base text-white mt-8">
            E-mail : contact@medist.com
          </p>
          <p className="text-sm xs:text-base text-white mt-2">
            Ph : +917608998089
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
