import React from "react";
import { useSelector } from "react-redux";

import {
  ProductsContainer,
  HeroSection,
  CategorySection,
  ChooseUsSection,
  Footer,
} from "../components";

function Home() {
  const products = useSelector((state) => state.products);
  return (
    <>
      <HeroSection />
      {products.length > 0 && (
        <ProductsContainer
          products={products}
          speciality="BESTSELLER"
          title="Bestsellers - Upto 50% Off"
        />
      )}
      {products.length > 0 && (
        <ProductsContainer
          products={products}
          speciality="NEWLY_LAUNCHED"
          title="Newly launched - Upto 70% Off"
        />
      )}
      <CategorySection />
      <ChooseUsSection />
      {products.length > 0 && (
        <ProductsContainer
          products={products}
          speciality="MOST_BOUGHT"
          title="Most bought on Medist"
        />
      )}
      <Footer />
    </>
  );
}

export default Home;
