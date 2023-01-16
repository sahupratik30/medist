import React from "react";
import { useNavigate } from "react-router-dom";

import heroBg from "../assets/hero-bg.jpg";
import heroImg from "../assets/hero-image.png";
import Button from "../UI/Button";

const HeroSection = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/products");
  }
  return (
    <section
      className="bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${heroBg})`,
      }}
    >
      <div className="container min-h-[545px] flex justify-between items-center">
        <div className="lg:w-2/3 flex flex-col">
          <h1 className="text-white text-3xl xs:text-4xl s:text-5xl md:text-6xl font-extrabold">
            Get your <span className="text-primary">medicines</span> delivered
            to your doorstep.
          </h1>
          <p className="mt-4 mb-8 text-[#dcdcdc] md:w-[60ch] md:max-w-[80%] text-sm xs:text-base">
            Our platform is the one-stop solution for all your health needs as
            we aim to keep you healthy.
          </p>
          <Button className="primary-btn" onClick={handleClick}>
            Order Now
          </Button>
        </div>
        <div className="hidden lg:block w-1/3">
          <img
            src={heroImg}
            alt="Doctor wearing white coat with a stethoscope on the neck"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
