import React from "react";
import ProductCard from "./ProductCard";
import { filterProductsBySpeciality } from "./../helpers";

const ProductsContainer = (props) => {
  const { products, speciality } = props;
  const filteredProducts = filterProductsBySpeciality(products, speciality);

  return (
    <section className="bg-[#f1f1f1] py-16">
      <div className="container">
        <h2 className=" pb-4 text-center text-xl font-bold xs:pb-5 xs:text-2xl md:pb-12 md:text-left md:text-4xl">
          {props.title}
        </h2>

        <div className="grid grid-cols-1 gap-5 s:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5">
          {filteredProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsContainer;
