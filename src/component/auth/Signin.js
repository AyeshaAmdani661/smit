import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import swal from "sweetalert";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      const errorCode = error.code;
        console.log(errorCode);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="row">
      <div className="p-5 box col-md-5 mx-auto text-center">
        <h2 className="my-5 text-secondary">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn w-100 rounded"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="box mt-3 text-center text-secondary">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      <div className="box mt-3 text-center text-secondary">
      © {new Date().getFullYear()} <Link to="/" style={{color:"blue"}}>myWeb</Link> All Rights Reserved.
      </div>
    </div>
  );
};

export default SignIn;
