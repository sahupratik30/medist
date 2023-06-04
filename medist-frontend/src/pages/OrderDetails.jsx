import OrderItem from "../components/Orders/OrderItem";
import Card from "../components/UI/Card";

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

const OrderDetails = () => {
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
          <p className="text-[12px] xs:text-sm">
            Ward no.1, Pratap Villa, Golei chowk
          </p>
          {/* city */}
          <p className="text-[12px] xs:text-sm">Karanjia</p>
          {/* state and postal code */}
          <p className="text-[12px] xs:text-sm">Odisha - 757037</p>
          {/* phone number */}
          <p className="text-[12px] xs:text-sm">7608998089</p>
        </div>

        {/* Order delivery status along with date */}
        <p className="text-[12px] font-medium xs:text-sm">
          Delivered on May 24 2023
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
            <span>UPI</span>
          </p>
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Total MRP</span>
            <span>₹60.00</span>
          </p>
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Total Discount</span>
            <span className="text-primary">-₹3.00</span>
          </p>
          <p className="flex items-center justify-between text-[12px] xs:text-sm">
            <span>Other Charges</span>
            <span>₹0.00</span>
          </p>
          <hr />
          <p className="flex items-center justify-between text-[12px] font-semibold xs:text-sm">
            <span>Net Payable</span>
            <span>₹57.00</span>
          </p>
        </div>

        <p className="text-[12px] xs:text-sm">
          You saved <span className="text-primary font-semibold">₹3.00</span> on this order
        </p>
      </Card>
    </div>
  );
};

export default OrderDetails;
