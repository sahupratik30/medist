import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../helpers";
import {
  addItemToCart,
  addProductToCart,
  updateCartData,
} from "../redux/slices/cart-slice";
import Swal from "sweetalert2";
import { isUserAuthenticated } from "../guards/auth-guard";

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
  const products = useSelector((state) => state?.products || {});
  const { items } = useSelector((state) => state?.cart || {});
  const dispatch = useDispatch();

  const { id } = useParams();
  const isAuthenticated = isUserAuthenticated();

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

  const _handleIncrease = () => {
    if (productCount.count === 5) return;
    dispatchProductCount({ type: "INCREMENT" });
  };

  const _handleDecrease = () => {
    if (productCount.count === 1) return;
    dispatchProductCount({ type: "DECREMENT" });
  };

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
        name: product?.pname,
        manufacturer: product?.manufacturer,
        quantity: productCount.count,
        price: product?.list_price,
        mrp: product?.mrp_price,
        image: product?.image,
      })
    );

    if (isAuthenticated) {
      // if item already exists in cart then call update cart else add to cart
      if (_alreadyExistsInCart(product?.pname)) {
        const existingItem = _alreadyExistsInCart(product?.pname);
        dispatch(
          updateCartData({
            itemId: existingItem?.id,
            data: {
              quantity: existingItem?.quantity + productCount.count,
              price: existingItem.price,
            },
          })
        );
      } else {
        dispatch(
          addProductToCart({
            name: product?.pname,
            manufacturer: product?.manufacturer,
            quantity: productCount.count,
            price: product?.list_price,
            mrp: product?.mrp_price,
            image: product?.image,
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
    <div className="container mt-12 flex flex-col items-center justify-between md:flex-row">
      <div className="md:w-2/5">
        <img src={product?.image} alt="" className="" />
      </div>
      <div className="flex flex-col md:w-1/2">
        <p className="s:text[22px] mb-3 text-base xs:text-xl s:mb-4">
          {product?.pname}
        </p>
        <p className="mb-6 w-max rounded-md bg-light-grey px-2 py-1 text-[10px] text-dark-grey s:mb-8">
          {transformedCategory}
        </p>
        <p className="mb-3 text-justify text-[12px] italic text-dark-grey xs:text-sm s:mb-4">
          <span className="font-semibold">Description:</span>
          {product?.description}
        </p>
        <p className="text-sm font-medium text-dark-grey xs:text-base">
          Our Price* <span className="text-light-red">{listPrice}</span>
        </p>
        <p className="mb-3 mt-1 text-[12px] text-dark-grey xs:text-sm s:mb-4">
          MRP <span className="line-through">{mrpPrice}</span>
          <span className="ml-2 text-[10px] text-primary xs:text-[12px]">
            GET {product?.discount}% OFF
          </span>
        </p>
        <div className="mb-6 flex items-center gap-4 s:mb-8">
          <p className="text-sm text-dark-grey xs:text-base">Quantity:</p>
          <div className="flex items-center gap-2">
            <button className="cart-action" onClick={_handleDecrease}>
              -
            </button>
            <input
              type="text"
              readOnly
              value={productCount.count}
              className="w-16 rounded-sm border border-dark-grey text-center text-sm xs:text-base"
            />
            <button className="cart-action add" onClick={_handleIncrease}>
              +
            </button>
          </div>
        </div>
        <Button
          className="primary-btn mb-4 md:ml-0"
          onClick={_addToCartHandler}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
