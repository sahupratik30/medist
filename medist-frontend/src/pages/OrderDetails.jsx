import { useEffect } from "react";
import OrderItem from "../components/Orders/OrderItem";
import Card from "../components/UI/Card";
import { isUserAuthenticated } from "../guards/auth-guard";
import { useSelector } from "react-redux";

const item = {
  id: 2,
  name: "Sri Sri Tattva Kasahari Cough Syrup 100 ml",
  manufacturer: "Sriveda Sattva Pvt Ltd",
  quantity: 1,
  price: "114.00",
  mrp: "120.00",
  totalPrice: 120,
  image: "http://127.0.0.1:8000/media/images/lung-care-2_EeYbnTY_bTNOjAM.jpg",
};

const OrderDetails = () => {
  const { user } = useSelector((state) => state?.auth || {});
  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated]);

  return (
    <div className="mx-auto my-6 max-w-[996px] px-4">
      <h1 className="mb-10 text-lg font-semibold xs:text-xl s:text-2xl">
        Order ID # 118860
      </h1>

      {/* Order details */}
      <Card className="mb-6 p-4 pt-2 shadow-sm">
        <p className="mb-6 text-[12px] font-light text-gray-300 xs:text-sm">
          Item Details
        </p>

        <div className="flex flex-col gap-4">
          {/* Display the items of the order by mapping over it */}
          <OrderItem item={item} />
        </div>
      </Card>

      {/* Shipping Details */}
      <Card className="mb-6 p-4 pt-2 shadow-sm">
        <p className="mb-6 text-[12px] font-light text-gray-300 xs:text-sm">
          Shipping Details
        </p>

        {/* shipping address */}
        <div className="mb-4 flex flex-col gap-1">
          {/* name */}
          <p className="text-sm font-medium xs:text-base">Pratik Sahu</p>
          {/* street address */}
          {user?.street_address && (
            <p className="text-[12px] xs:text-sm">{user?.street_address}</p>
          )}
          {/* city */}
          <p className="text-[12px] xs:text-sm">{user?.City}</p>
          {/* state and postal code */}
          <p className="text-[12px] xs:text-sm">
            {user?.state} - {user?.postalcode}
          </p>
          {/* phone number */}
          <p className="text-[12px] xs:text-sm">{user?.phoneNumber}</p>
        </div>

        {/* Order delivery status along with date */}
        <p className="text-[12px] font-medium xs:text-sm">
          Ordered on June 24 2023
        </p>
      </Card>

      {/* Price Details */}
      <Card className="mb-6 p-4 pt-2 shadow-sm">
        <p className="mb-6 text-[12px] font-light text-gray-300 xs:text-sm">
          Price Details
        </p>

        <div className="mb-6 flex flex-col gap-1">
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Payment method</span>
            <span>Card</span>
          </p>
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Total MRP</span>
            <span>₹120.00</span>
          </p>
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Total Discount</span>
            <span className="text-primary">-₹6.00</span>
          </p>
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Other Charges</span>
            <span>₹0.00</span>
          </p>
          <hr />
          <p className="flex items-center justify-between text-[12px] font-semibold xs:text-sm">
            <span>Net Payable</span>
            <span>₹114.00</span>
          </p>
        </div>

        <p className="text-[12px] xs:text-sm">
          You saved <span className="font-semibold text-primary">₹6.00</span> on
          this order
        </p>
      </Card>
    </div>
  );
};

export default OrderDetails;
