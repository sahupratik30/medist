import React from "react";

const Card = (props) => {
  const cardClasses = "bg-white rounded-lg shadow-lg " + props.className;
  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
