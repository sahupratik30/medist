const OrderItem = ({ item }) => {
  return (
    <div className="flex items-start gap-2 xs:gap-4">
      <img src={item.image} className="w-16 xs:w-20" alt="" />

      <div className="w-full">
        {/* Order delivery date to be shown in mobile view */}
        <p className="mb-2 text-sm xs:text-base md:hidden">
          Delivered on May 24, 2023
        </p>

        <p
          className="mb-2 line-clamp-1 text-sm text-gray-400 xs:text-base md:text-black"
          title="D Protin Chocolate Powder 500 gm"
        >
          {item.name}
        </p>

        <p className="my-3 mb-4 mt-0 hidden text-[12px] font-light italic text-dark-grey md:block">
          {item.manufacturer}
        </p>

        <p className="mb-1 text-sm text-dark-grey xs:text-base">
          QTY: <span>{item.quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
