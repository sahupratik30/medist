import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { formatPrice } from "./../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "./../store/cart-slice";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    id,
    pname,
    manufacturer,
    mrp_price,
    list_price,
    category,
    discount,
    image,
  } = props.product;
  const listPrice = formatPrice(list_price);
  const mrpPrice = formatPrice(mrp_price);
  const transformedCategory = category
    .toLowerCase()
    .split("_")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  function handleClick() {
    navigate(`/product/${id}`);
  }
  function addToCartHandler() {
    dispatch(
      cartActions.addItemToCart({
        id,
        name: pname,
        manufacturer,
        quantity: 1,
        price: list_price,
        mrp: mrp_price,
        image,
      })
    );
  }

  return (
    <Card className="p-4 relative">
      <small className="absolute top-3 left-3 text-[10px] bg-light-red text-white px-3 rounded-sm py-0.5">
        <span>{discount}</span>% off
      </small>
      <img src={image} alt="" className="w-40 mx-auto my-3" />
      <p className="text-sm xs:text-base line-clamp-1" title={pname}>
        {pname}
      </p>
      <p className="text-[12px] my-3 text-dark-grey font-light italic">
        {manufacturer}
      </p>
      <p className="text-[10px] text-primary bg-secondary border border-primary w-max py-1 rounded-full px-3 mb-5">
        {transformedCategory}
      </p>
      <p className="text-sm xs:text-base text-dark-grey font-medium">
        Our Price* <span className="text-light-red">{listPrice}</span>
      </p>
      <p className="text-[12px] xs:text-sm text-dark-grey mt-1">
        MRP <span className="line-through">{mrpPrice}</span>
      </p>
      <div className="flex flex-col xs:flex-row items-center mt-6 gap-3">
        <Button
          className="primary-btn w-full xs:w-1/2"
          onClick={addToCartHandler}
        >
          Add
        </Button>
        <Button className="secondary-btn w-full xs:w-1/2" onClick={handleClick}>
          View
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
