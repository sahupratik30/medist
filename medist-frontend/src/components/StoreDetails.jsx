const StoreDetails = ({ name, address, isOpen }) => {
  return (
    <div className="mb-10 flex items-center gap-4">
      <input
        type="radio"
        name="store"
        id="store"
        className="h-4 w-4 border-gray-300"
      />

      <div className="w-full">
        <p className="line-clamp-1 text-sm xs:text-base" title="">
          {name}
        </p>

        <p className="my-3 mb-2 mt-0 line-clamp-1 text-[12px] font-light italic text-dark-grey">
          {address}
        </p>

        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="mb-1 text-[10px] font-normal text-dark-grey xs:text-sm">
            {isOpen ? "Open Now" : "Closed"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
