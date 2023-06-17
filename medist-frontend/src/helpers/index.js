import { toast } from "react-hot-toast";
import { store } from "./../redux/store";

// function to structure query parameters
export const structureQueryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

// function to format price
export const formatPrice = (amount) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
  return formattedAmount;
};

// function to format place results
export const formatPlaceResults = (places = []) => {
  const results = places
    ?.filter((place) => place?.opening_hours)
    .map((place) => {
      return {
        name: place?.name,
        address: place?.vicinity,
        isOpen: place?.opening_hours?.open_now,
      };
    });
  return results;
};

// function to filter products
export const filterProducts = (products = [], filterConfig = {}) => {
  const key = Object.keys(filterConfig)[0];
  const filteredProducts = products.filter((product) => {
    return product[key] === filterConfig[key];
  });
  return filteredProducts;
};

// function to find searched products
export const searchProduct = (searchValue = "") => {
  const state = store.getState();
  const products = state?.products;

  const searchResult = products.filter((product) =>
    product?.pname?.toLowerCase()?.includes(searchValue?.toLowerCase())
  );

  return searchResult;
};

// function to handle errors
export const errorHandler = (error) => {
  showToast(
    error?.reason?.length || error?.msg?.length
      ? error?.reason || error?.msg
      : "Something went wrong, Try again after some time."
  );
};

// function to show toast message
export const showToast = (message, type = "error", duration = 2000, id) => {
  toast[type](message, { duration, id });
};
