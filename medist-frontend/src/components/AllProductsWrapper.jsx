import React from "react";
import ProductCard from "./ProductCard";

const AllProductsWrapper = ({ products }) => {
  return (
    <>
      {products?.length ? (
        <div className="grid grid-cols-1 gap-5 s:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 mb-8">
          {products.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-base text-gray-400 xs:text-lg">
          No Products available!
        </p>
      )}
    </>
  );
};

export default AllProductsWrapper;
