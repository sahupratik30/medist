import { useEffect } from "react";
import Order from "../components/Orders/Order";
import Card from "../components/UI/Card";
import { isUserAuthenticated } from "../guards/auth-guard";

const item = {
  id: 2,
  name: "Sri Sri Tattva Kasahari Cough Syrup 100 ml",
  manufacturer: "Sriveda Sattva Pvt Ltd",
  quantity: 1,
  price: "57.00",
  mrp: "60.00",
  totalPrice: 57,
  image: "http://127.0.0.1:8000/media/images/lung-care-2_EeYbnTY_bTNOjAM.jpg",
};

const Orders = () => {
  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated]);

  return (
    <div className="mx-auto my-6 max-w-[996px] px-4">
      <h1 className="mb-10 text-lg font-semibold xs:text-xl s:text-2xl">
        Your Orders
      </h1>
      <div className="flex flex-col gap-3 sm:gap-6">
        {/* map over all orders and display the order */}
        <Order item={item} />
      </div>
    </div>
  );
};

export default Orders;
