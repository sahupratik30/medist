import React from "react";
import CategoryCard from "./CategoryCard";
import {
  lung,
  liver,
  stomach,
  heart,
  thermometer,
  diabetes,
  eye,
  boneAndJoint,
} from "../assets";

const CategorySection = () => {
  return (
    <section className="bg-[#f1f1f1] pb-16">
      <div className="container pt-8 xs:pt-10 md:pt-24">
        <h2 className="text-center text-xl xs:text-2xl md:text-4xl font-bold mb-4">
          Shop By Category
        </h2>
        <p className="text-sm xs:text-base text-dark-grey text-center mb-12">
          We have a wide range of categories for you to choose from according to
          your need.
        </p>
        <div className="grid grid-cols-1 s:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-3 lg:gap-5">
          <CategoryCard image={lung} alt="lung" title="Lung Care" />
          <CategoryCard image={liver} alt="liver" title="Liver Care" />
          <CategoryCard image={stomach} alt="stomach" title="Stomach Care" />
          <CategoryCard image={heart} alt="heart" title="Heart Care" />
          <CategoryCard
            image={thermometer}
            alt="thermometer"
            title="Cold And Fever"
          />
          <CategoryCard
            image={diabetes}
            alt="diabetes machine"
            title="Diabetes Care"
          />
          <CategoryCard image={eye} alt="eye" title="Eye Care" />
          <CategoryCard
            image={boneAndJoint}
            alt="knee joint"
            title="Bone And Joint Pain"
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
