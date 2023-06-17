import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../helpers";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { resetCart } from "../redux/slices/cart-slice";
import { isUserAuthenticated } from "../guards/auth-guard";

const PaymentDetails = ({ forPayment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);
  const totalAmount = useSelector((state) => state?.cart?.totalAmount);
  const isAuthenticated = isUserAuthenticated();

  const totalMrp = cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.mrp,
    0
  );
  const totalDiscount = totalMrp - totalAmount;
  const amountTotal = formatPrice(totalAmount);
  const mrpTotal = formatPrice(totalMrp);
  const discountTotal = formatPrice(totalDiscount);

  const _handleClick = () => {
    isAuthenticated ? navigate("/payment") : navigate("/signin");
  };

  return (
    <Card className="sticky top-20 p-4 lg:flex-[0.3]">
      <h2 className="text-[12px] text-dark-grey xs:text-sm">PAYMENT DETAILS</h2>
      <div className="my-5 flex flex-col gap-2">
        <p className="flex justify-between text-sm font-light xs:text-base">
          MRP Total <span>{mrpTotal}</span>
        </p>
        <p className="flex justify-between text-sm font-light xs:text-base">
          Medist discount <span>-{discountTotal}</span>
        </p>
        <p className="flex justify-between text-sm font-medium xs:text-base">
          Total Amount* <span>{amountTotal}</span>
        </p>
      </div>
      <p className="mb-5 rounded-sm bg-[#f1f1f1] py-1 pl-2 pr-0 text-sm font-semibold text-primary xs:text-base">
        TOTAL SAVINGS <span>{discountTotal}</span>
      </p>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-[12px] text-dark-grey xs:text-sm">
            TOTAL AMOUNT
          </h2>
          <p className="text-base font-medium text-light-red xs:text-lg s:text-xl">
            {amountTotal}
          </p>
        </div>
        <Button className="primary-btn h-max" onClick={_handleClick}>
          {forPayment ? "PAY NOW" : "PROCEED"}
        </Button>
      </div>
    </Card>
  );
};

export default PaymentDetails;
