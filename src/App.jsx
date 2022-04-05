import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import dotenv from 'dotenv'
import Success from "./pages/Success";
import { useSelector } from "react-redux";

dotenv.config()

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    let change = () => {};
    if (
      (user && window.location.pathname.split("/").includes("login")) ||
      window.location.pathname.split("/").includes("register")
    ) {
      change = () => (window.location.pathname = "/");
    }

    change();
  }, [user]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
