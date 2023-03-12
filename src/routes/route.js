import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "../component/addProduct/AddProduct";
import Cart from "../component/cart/Cart";
import SignIn from "../component/auth/Signin";
import SignUp from "../component/auth/Signup";
import Error404 from "../component/error/Error404";
import Home from "../component/home/Home";
import WelcomeScreen from "../component/welcome screen/welcomeScreen";
import { useUserAuth } from "../context/UserAuthContext";

export default function MainRoute() {
  const { user } = useUserAuth();

  return (
    <div>
      {user ? (
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" replace={true} />} />
        </Routes>
      )}
    </div>
  );
}
