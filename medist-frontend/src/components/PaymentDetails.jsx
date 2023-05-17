import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../helpers";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { resetCart } from "./../store/cart-slice";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalMrp = cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.mrp,
    0
  );
  const totalDiscount = totalMrp - totalAmount;
  const amountTotal = formatPrice(totalAmount);
  const mrpTotal = formatPrice(totalMrp);
  const discountTotal = formatPrice(totalDiscount);
  function handleClick() {
    navigate("/checkout");
    dispatch(resetCart());
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("totalQuantity");
  }
  return (
    <Card className="p-4 lg:flex-[0.3] sticky top-20">
      <h2 className="text-dark-grey text-[12px] xs:text-sm">PAYMENT DETAILS</h2>
      <div className="flex flex-col gap-2 my-5">
        <p className="flex justify-between font-light text-sm xs:text-base">
          MRP Total <span>{mrpTotal}</span>
        </p>
        <p className="flex justify-between font-light text-sm xs:text-base">
          Medist discount <span>-{discountTotal}</span>
        </p>
        <p className="flex justify-between font-medium text-sm xs:text-base">
          Total Amount* <span>{amountTotal}</span>
        </p>
      </div>
      <p className="mb-5 text-primary rounded-sm font-semibold text-sm xs:text-base bg-[#f1f1f1] py-1 pr-0 pl-2">
        TOTAL SAVINGS <span>{discountTotal}</span>
      </p>
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h2 className="text-dark-grey text-[12px] xs:text-sm">
            TOTAL AMOUNT
          </h2>
          <p className="text-light-red font-medium text-base xs:text-lg s:text-xl">
            {amountTotal}
          </p>
        </div>
        <Button className="primary-btn h-max" onClick={handleClick}>
          PAY NOW
        </Button>
      </div>
    </Card>
  );
};

export default PaymentDetails;
