import React from "react";
import { useDispatch } from "react-redux";
import Button from "./UI/Button";
import { formatPrice } from "../helpers";
import { removeCartItem, removeItemFromCart } from "../redux/slices/cart-slice";
import { isUserAuthenticated } from "../guards/auth-guard";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const isAuthenticated = isUserAuthenticated();
  const price = formatPrice(item.price);
  const mrp = formatPrice(item.mrp);

  const _removeFromCartHandler = () => {
    dispatch(removeItemFromCart(item.id));
    if (isAuthenticated) {
      dispatch(
        removeCartItem({
          itemId: item.id,
          data: { quantity: item.quantity, price: item.price },
        })
      );
    }
  };
  return (
    <div className="mb-10 flex items-start gap-4">
      <img src={item.image} className="w-16 xs:w-20" alt="" />

      <div className="w-full">
        <p
          className="line-clamp-1 text-sm xs:text-base"
          title="D Protin Chocolate Powder 500 gm"
        >
          {item.name}
        </p>

        <p className="my-3 mb-4 mt-0 text-[12px] font-light italic text-dark-grey">
          {item.manufacturer}
        </p>

        <p className="mb-1 text-sm text-dark-grey xs:text-base">
          QTY: <span>{item.quantity}</span>
        </p>

        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-sm font-medium text-light-red xs:text-base">
            {price}
            <small className="font-regular ml-1 text-[10px] text-dark-grey line-through xs:text-[12px]">
              {mrp}
            </small>
          </p>

          <Button className="btn-alt" onClick={_removeFromCartHandler}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
