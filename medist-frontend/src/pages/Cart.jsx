import React from "react";
import { PaymentDetails } from "../components";
import Card from "../components/UI/Card";
import { CartItem } from "../components";
import { useSelector } from "react-redux";
import emptyCart from "../assets/images/empty-cart.svg";

const Cart = () => {
  const cartItems = useSelector((state) => state?.cart?.items);
  console.log(cartItems);

  if (cartItems.length === 0)
    return (
      // <h1 className="text-center mt-10 text-xl xs:text-2xl md:text-3xl text-light-red">
      //   Your cart is empty!
      // </h1>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-6">
        <img src={emptyCart} className="w-24 xs:w-32 sm:w-44 translate-x-5" alt="" />
        <h2 className="text-sm w-max font-normal text-gray-300 xs:text-lg sm:text-2xl">
          No items were added!
        </h2>
      </div>
    );

  return (
    <div className="mx-auto my-6 max-w-[996px] px-4">
      <h1 className="mb-10 text-lg font-semibold xs:text-xl s:text-2xl">
        Order Summary
      </h1>
      <div className="flex flex-col justify-center gap-4 lg:flex-row lg:items-start lg:justify-start">
        <Card className="p-4 lg:flex-[0.7]">
          <h2 className="mb-5 text-[12px] text-dark-grey xs:text-sm">
            PRODUCTS
          </h2>
          {cartItems?.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </Card>
        <PaymentDetails />
      </div>
    </div>
  );
};

export default Cart;
