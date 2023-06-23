import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorHandler, formatPrice } from "../helpers";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { resetCart } from "../redux/slices/cart-slice";
import { isUserAuthenticated } from "../guards/auth-guard";
import Swal from "sweetalert2";
import { createOrder, verifySignature } from "../http/http-calls";
import { RAZORPAY_KEY } from "../config";
import logo from "../assets/images/logo.png";
import { useState } from "react";

const PaymentDetails = ({ forPayment, store }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);
  const totalAmount = useSelector((state) => state?.cart?.totalAmount);
  const { user } = useSelector((state) => state?.auth || {});
  const isAuthenticated = isUserAuthenticated();

  console.log("STORE>>>", store);

  const totalMrp = cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.mrp,
    0
  );
  const totalDiscount = totalMrp - totalAmount;
  const amountTotal = formatPrice(totalAmount);
  const mrpTotal = formatPrice(totalMrp);
  const discountTotal = formatPrice(totalDiscount);

  // function to load script for Razorpay
  const _loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // function to enable Razorpay
  const _displayRazorpay = async () => {
    try {
      setLoading(true);
      const res = await _loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert(
          "Failure loading the Razorpay SDK. PLease make sure you are connected to the internet"
        );
        return;
      }

      const orderData = await createOrder({
        amount: (+totalAmount * 100)?.toFixed(2),
      });

      const { amount, currency, order_id } = orderData;

      const options = {
        key: RAZORPAY_KEY,
        amount: amount.toString(),
        currency: currency,
        name: "Medist",
        description: "Complete Payment",
        image: logo,
        order_id: order_id,
        handler: async function (response) {
          const razorpay_paymentId = response.razorpay_payment_id;
          const razorpay_orderId = response.razorpay_order_id;
          const razorpay_signature = response.razorpay_signature;

          const res = await verifySignature({
            razorpay_paymentId,
            razorpay_orderId,
            razorpay_signature,
          });

          if (!res?.error) {
            alert(res?.status);
            // _makePayment();
          }
        },
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: user?.phoneNumber,
        },
        theme: {
          color: "#04c300",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  const _handleClick = () => {
    isAuthenticated ? navigate("/payment") : navigate("/signin");
  };

  // function to handle payment
  const _handlePayment = () => {
    if (store === null) {
      Swal.fire({
        icon: "error",
        text: "Please select a store first!",
        confirmButtonColor: "#ee0000",
      });
      return;
    }
    // proceed to payment
    _displayRazorpay();
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
        <Button
          className="primary-btn h-max"
          disabled={loading}
          onClick={!forPayment ? _handleClick : _handlePayment}
        >
          {loading ? "Please wait..." : forPayment ? "PAY NOW" : "PROCEED"}
        </Button>
      </div>
    </Card>
  );
};

export default PaymentDetails;
