const filterProducts = (products = [], filterConfig = {}) => {
  const key = Object.keys(filterConfig)[0];
  const filteredProducts = products.filter((product) => {
    return product[key] === filterConfig[key];
  });
  return filteredProducts;
};

export default filterProducts;
