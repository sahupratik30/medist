import React from "react";
import ProductCard from "./ProductCard";
import { filterProducts } from "./../helpers";

const ProductsContainer = (props) => {
  const { products, speciality } = props;
  const filteredProducts = filterProducts(products, { speciality });
  return (
    <section className="bg-[#f1f1f1] py-16">
      <div className="container">
        <h2 className=" pb-4 xs:pb-5 md:pb-12 text-center md:text-left text-xl xs:text-2xl md:text-4xl font-bold">
          {props.title}
        </h2>
        <div className="grid grid-cols-1 s:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-3 lg:gap-5">
          {filteredProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsContainer;
