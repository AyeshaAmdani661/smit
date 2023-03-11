import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(name ,email, password);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="row">
      <div className="p-5 col-md-5 mx-auto box text-center">
        <h2 className="my-5 text-secondary">Signup</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="box mt-3 text-center text-secondary">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      <div className="box mt-3 text-center text-secondary">
      {/* © {new Date().getFullYear()} <Link to="/" style={{color:"blue"}}>myWeb</Link> All Rights Reserved. */}
      © {new Date().getFullYear()} myWeb All Rights Reserved.
      
      </div>
    </div>
  );
};

export default Signup;
