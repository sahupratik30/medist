import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import useFetch from "./hooks/use-fetch";
import { useDispatch } from "react-redux";
import { setProducts } from "./store/products-slice";
import { useEffect } from "react";
import Checkout from "./pages/Checkout";

function App() {
  const { isLoading, error, sendRequest: fetchProducts } = useFetch();
  const dispatch = useDispatch();
  const loadProducts = (data) => {
    dispatch(setProducts(data));
  };
  useEffect(() => {
    fetchProducts({ url: "http://127.0.0.1:8000/products/" }, loadProducts);
  }, []);
  return (
    <div className="App font-Poppins">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
