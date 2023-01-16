import React from "react";
import { PaymentDetails } from "../components";
import Card from "../UI/Card";
import { CartItem } from "../components";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  if (cartItems.length === 0)
    return (
      <h1 className="text-center mt-10 text-xl xs:text-2xl md:text-3xl text-light-red">
        Your cart is empty!
      </h1>
    );
  return (
    <div className="mx-auto max-w-[996px] px-4 my-6">
      <h1 className="font-semibold text-lg xs:text-xl s:text-2xl mb-10">
        Order Summary
      </h1>
      <div className="flex flex-col gap-4 lg:flex-row justify-center lg:justify-start lg:items-start">
        <Card className="p-4 lg:flex-[0.7]">
          <h2 className="text-dark-grey text-[12px] xs:text-sm mb-5">
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
