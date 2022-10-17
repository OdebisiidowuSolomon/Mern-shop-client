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
import { getCart } from "./redux/apiCalls";
import { useDispatch } from "react-redux";
import { fillCart } from "./redux/cartRedux";

dotenv.config()

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch()

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

  useEffect(() => {
    if(user?.username) {
      getCart(dispatch, user.username).then(e => dispatch(fillCart(e)))
    }
    console.log('Hiii');
  },[dispatch, user])

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
