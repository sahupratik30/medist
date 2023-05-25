import { toast } from "react-hot-toast";

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

// function to filter products
export const filterProductsBySpeciality = (products = [], speciality) => {
  const filteredProducts = products.filter((product) => {
    return product.speciality === speciality;
  });
  return filteredProducts;
};

// function to handle errors
export const errorHandler = (error) => {
  console.log("error>>", error);
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
