import React from "react";
import chooseUs from "../assets/choose-us.png";

const ChooseUsSection = () => {
  return (
    <section className="bg-white sm:min-h-[450px] py-8 sm:py-16">
      <div className="container flex justify-between items-center gap-8">
        <div className="hidden md:block md:w-1/2">
          <img src={chooseUs} alt="doctor wearing blue shirt and blue mask" />
        </div>
        <div className="md:w-1/2">
          <h1 className="mb-4 xs:mb-8 text-xl xs:text-3xl lg:text-5xl font-extrabold">
            Why Choose <span className="text-primary">Medist?</span>
          </h1>
          <ul className="text-sm xs:text-base list-disc ml-5 text-dark-grey flex flex-col gap-3 lg:gap-4 s:text-justify">
            <li>Delivery of all types of medicines across the country.</li>
            <li>All medicines and healthcare products are genuine.</li>
            <li>
              Get access to all the nearby stores and get your medicines
              delivered in minutes.
            </li>
            <li>More than 1 Million trusted customers.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
