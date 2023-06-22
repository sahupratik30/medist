import React from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { formatPrice, showToast } from "./../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  addProductToCart,
  updateCartData,
} from "../redux/slices/cart-slice";
import Swal from "sweetalert2";
import { isUserAuthenticated } from "../guards/auth-guard";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state?.cart || {});
  const isAuthenticated = isUserAuthenticated();
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

  // function to check if item alredy exists in the cart
  const _alreadyExistsInCart = (productName) => {
    const existingItem = items.find((item) => item.name === productName);
    if (existingItem) return existingItem;
    return false;
  };

  const _addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id,
        name: pname,
        manufacturer,
        quantity: 1,
        price: list_price,
        mrp: mrp_price,
        image,
      })
    );

    if (isAuthenticated) {
      // if item already exists in cart then call update cart else add to cart
      if (_alreadyExistsInCart(pname)) {
        const existingItem = _alreadyExistsInCart(pname);
        dispatch(
          updateCartData({
            itemId: existingItem?.id,
            data: {
              quantity: existingItem?.quantity + 1,
              price: existingItem.price,
            },
          })
        );
      } else {
        dispatch(
          addProductToCart({
            name: pname,
            manufacturer,
            quantity: 1,
            price: list_price,
            mrp: mrp_price,
            image,
          })
        );
      }
    }

    Swal.fire({
      icon: "success",
      text: "Item added successfully!",
      confirmButtonColor: "#04c300",
    });
  };

  return (
    <Card className="relative p-4">
      <small className="absolute left-3 top-3 rounded-sm bg-light-red px-3 py-0.5 text-[10px] text-white">
        <span>{discount}</span>% off
      </small>
      <img
        src={image}
        alt=""
        className="mx-auto my-3 h-40 w-40 object-contain"
      />
      <p className="line-clamp-1 text-sm xs:text-base" title={pname}>
        {pname}
      </p>
      <p
        className="my-3 line-clamp-1 text-[12px] font-light italic text-dark-grey"
        title={manufacturer}
      >
        {manufacturer}
      </p>
      <p className="mb-5 w-max rounded-full border border-primary bg-secondary px-3 py-1 text-[10px] text-primary">
        {transformedCategory}
      </p>
      <p className="text-sm font-medium text-dark-grey xs:text-base">
        Our Price* <span className="text-light-red">{listPrice}</span>
      </p>
      <p className="mt-1 text-[12px] text-dark-grey xs:text-sm">
        MRP <span className="line-through">{mrpPrice}</span>
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 xs:flex-row">
        <Button
          className="primary-btn w-full xs:w-1/2"
          onClick={_addToCartHandler}
        >
          Add
        </Button>
        <Button
          className="secondary-btn w-full xs:w-1/2"
          onClick={() => navigate(`/product/${id}`)}
        >
          View
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
