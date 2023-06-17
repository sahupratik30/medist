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
import { formatPlaceResults } from "../helpers";
import { setPharmacies } from "../redux/slices/pharmacies-slice";

const Home = () => {
  const products = useSelector((state) => state?.products);
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

  // fetch nearby pharmacies
  const { places: pharmacies } = useSearchNearbyPlaces(500, ["pharmacy"]);

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    if (pharmacies?.length) {
      const nearbyPharmacies = formatPlaceResults(pharmacies);
      console.log("Pharmacies>>", nearbyPharmacies);
      dispatch(setPharmacies(nearbyPharmacies));
    }
  }, [pharmacies]);

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
