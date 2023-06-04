import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ProductsContainer,
  HeroSection,
  CategorySection,
  ChooseUsSection,
  Footer,
} from "../components";
import { fetchProducts } from "../redux/slices/products-slice";
import useSearchNearbyPlaces from "../hooks/useSearchNearbyPlaces";

const Home = () => {
  const products = useSelector((state) => state?.products);
  const dispatch = useDispatch();

  const result = useSearchNearbyPlaces(1000, "pharmacy");
  console.log("PLACES>>>>>", result);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
};

export default Home;
