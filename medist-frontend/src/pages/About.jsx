import React from "react";

import aboutImg from "../assets/about.png";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/products");
  }
  return (
    <div className="container flex flex-col md:flex-row justify-between gap-16 lg:gap-64 items-center mt-12">
      <div className="md:w-1/2">
        <img
          src={aboutImg}
          alt="medicines kept in a green color box"
          className=""
        />
      </div>
      <div className="flex flex-col md:w-1/2">
        <h1 className="mx-auto md:ml-0 text-2xl xs:text-3xl s:text-4xl lg:text-5xl font-extrabold">
          <span className="text-primary">Who</span> are we?
        </h1>
        <p className="text-justify mt-4 mb-8 text-dark-grey text-sm xs:text-base">
          Our platform acts as a one-stop solution for all your healthcare
          needs. We deliver all kinds of medicines across the country which are
          purely genuine. On our platform, we deliver medicines to your doorstep
          in minutes in an emergency. Also, you get access to nearby medicines
          stores to get instant delivery. So, start your journey with us now and
          avail our services.
        </p>
        <Button
          className="mx-auto md:ml-0 primary-btn mb-4"
          onClick={handleClick}
        >
          Order Now
        </Button>
      </div>
    </div>
  );
}

export default About;
