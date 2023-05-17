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
export const filterProducts = (products = [], filterConfig = {}) => {
  const key = Object.keys(filterConfig)[0];
  const filteredProducts = products.filter((product) => {
    return product[key] === filterConfig[key];
  });
  return filteredProducts;
};

