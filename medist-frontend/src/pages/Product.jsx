import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "./../helpers/format-price";
import { cartActions } from "./../store/cart-slice";

const defaultProductState = { count: 1 };
const productReducer = (state, action) => {
  if (action.type === "INCREMENT") {
    return { count: state.count + 1 };
  }
  if (action.type === "DECREMENT") {
    return { count: state.count - 1 };
  }
  return defaultProductState;
};

const Product = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  let product, listPrice, mrpPrice, transformedCategory;
  if (products.length > 0) {
    product = products.find((product) => +product.id === +id);
    listPrice = formatPrice(product?.list_price);
    mrpPrice = formatPrice(product?.mrp_price);
    transformedCategory = product?.category
      .toLowerCase()
      .split("_")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const [productCount, dispatchProductCount] = useReducer(
    productReducer,
    defaultProductState
  );

  const handleIncrease = () => {
    if (productCount.count === 5) return;
    dispatchProductCount({ type: "INCREMENT" });
  };
  const handleDecrease = () => {
    if (productCount.count === 1) return;
    dispatchProductCount({ type: "DECREMENT" });
  };
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name: product?.pname,
        manufacturer: product?.manufacturer,
        quantity: productCount.count,
        price: product?.list_price,
        mrp: product?.mrp_price,
        image: product?.image,
      })
    );
  };
  return (
    <div className="container flex flex-col md:flex-row justify-between items-center mt-12">
      <div className="md:w-2/5">
        <img src={product?.image} alt="" className="" />
      </div>
      <div className="flex flex-col md:w-1/2">
        <p className="text-base xs:text-xl s:text[22px] mb-3 s:mb-4">
          {product?.pname}
        </p>
        <p className="text-dark-grey bg-light-grey rounded-md w-max px-2 py-1 text-[10px] mb-6 s:mb-8">
          {transformedCategory}
        </p>
        <p className="text-justify text-dark-grey text-[12px] italic xs:text-sm mb-3 s:mb-4">
          <span className="font-semibold">Description:</span>
          {product?.description}
        </p>
        <p className="text-sm xs:text-base text-dark-grey font-medium">
          Our Price* <span className="text-light-red">{listPrice}</span>
        </p>
        <p className="text-[12px] xs:text-sm text-dark-grey mt-1 mb-3 s:mb-4">
          MRP <span className="line-through">{mrpPrice}</span>
          <span className="text-[10px] xs:text-[12px] text-primary ml-2">
            GET {product?.discount}% OFF
          </span>
        </p>
        <div className="flex items-center gap-4 mb-6 s:mb-8">
          <p className="text-dark-grey text-sm xs:text-base">Quantity:</p>
          <div className="flex items-center gap-2">
            <button className="cart-action" onClick={handleDecrease}>
              -
            </button>
            <input
              type="text"
              readOnly
              value={productCount.count}
              className="border text-center rounded-sm border-dark-grey w-16 text-sm xs:text-base"
            />
            <button className="cart-action add" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
        <Button className="md:ml-0 primary-btn mb-4" onClick={addToCartHandler}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
