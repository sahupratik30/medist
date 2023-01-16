import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import Button from "../UI/Button";
import formatPrice from "./../helpers/format-price";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const price = formatPrice(item.price);
  const mrp = formatPrice(item.mrp);
  function removeFromCartHandler() {
    dispatch(cartActions.removeItemFromCart(item.id));
  }
  return (
    <div className="flex gap-4 items-start mb-10">
      <img src={item.image} className="w-16 xs:w-20" alt="" />
      <div className="w-full">
        <p
          className="text-sm xs:text-base line-clamp-1"
          title="D Protin Chocolate Powder 500 gm"
        >
          {item.name}
        </p>
        <p className="mt-0 text-[12px] my-3 text-dark-grey font-light italic mb-4">
          {item.manufacturer}
        </p>
        <p className="text-dark-grey text-sm xs:text-base mb-1">
          QTY: <span>{item.quantity}</span>
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-end w-full">
          <p className="text-sm xs:text-base text-light-red font-medium">
            {price}
            <small className="font-regular line-through text-[10px] ml-1 xs:text-[12px] text-dark-grey">
              {mrp}
            </small>
          </p>
          <Button className="btn-alt" onClick={removeFromCartHandler}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
