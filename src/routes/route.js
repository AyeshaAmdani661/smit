import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../component/about/About";
import AddClass from "../component/addClass/AddClass";
import SignIn from "../component/auth/Signin";
import SignUp from "../component/auth/Signup";
import Error404 from "../component/error/Error404";
import Home from "../component/home/Home";
import { useUserAuth } from "../context/UserAuthContext";

export default function MainRoute() {
  const { user } = useUserAuth();

  return (
    <div>
      {(user) ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="addClass" element={<AddClass />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace={true}/>} />
        </Routes>
      )}
    </div>
  );
}
