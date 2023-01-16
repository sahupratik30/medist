import React from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";

const CategoryCard = (props) => {
  return (
    <Link to="/">
      <Card className="h-48 py-6 relative hover:scale-105 transition duration-200">
        <img
          src={props.image}
          alt={props.alt}
          className="mx-auto w-20 object-contain"
        />
        <p className="text-lg xs:text-xl text-dark-grey mt-10 text-center">
          {props.title}
        </p>
      </Card>
    </Link>
  );
};

export default CategoryCard;
