import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import OrderItem from "./OrderItem";

const Order = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="transition-200 flex cursor-pointer flex-col gap-6 p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-start md:justify-between"
      onClick={() => navigate("/orders/118860")}
    >
      <div className="flex flex-col gap-4">
        {/* map over all items of the order and display the order item */}
        <OrderItem item={item} />
      </div>

      {/* order details to be shown in desktop view */}
      <div className="hidden flex-col gap-1 md:flex">
        <div className="flex items-center gap-1">
          <span className="h-[10px] w-[10px] rounded-full bg-primary" />
          <p className="text-sm font-semibold">Delivered on May 24, 2023</p>
        </div>
        <p className="text-[12px]">Your order has been delivered</p>
      </div>
    </Card>
  );
};

export default Order;
