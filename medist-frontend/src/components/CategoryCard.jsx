import React from "react";
import { Link } from "react-router-dom";
import Card from "./UI/Card";

const CategoryCard = (props) => {
  const category = props?.title.split(" ").join("_").toUpperCase();

  return (
    <Link to={`/products?category=${category}`}>
      <Card className="relative h-48 py-6 transition duration-200 hover:scale-105">
        <img
          src={props.image}
          alt={props.alt}
          className="mx-auto w-20 object-contain"
        />
        <p className="mt-10 text-center text-lg text-dark-grey xs:text-xl">
          {props.title}
        </p>
      </Card>
    </Link>
  );
};

export default CategoryCard;
