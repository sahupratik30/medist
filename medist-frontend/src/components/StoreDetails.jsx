const StoreDetails = ({ name, address, isOpen, onChangeStore }) => {
  return (
    <div className="mb-10 flex items-center gap-4">
      <input
        type="radio"
        name="store"
        id={`store__${name}`}
        value={name}
        className="h-4 w-4 border-gray-300"
        onChange={(e) => onChangeStore(e.target.value)}
      />

      <div className="w-full">
        <label htmlFor={`store__${name}`} className="cursor-pointer">
          <p className="line-clamp-1 text-sm xs:text-base" title={name}>
            {name}
          </p>
        </label>

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
