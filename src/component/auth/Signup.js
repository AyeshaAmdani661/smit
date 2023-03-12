import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(name, email, password, contact, type);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row text-center">
      <div className="p-5 col-md-6 col-lg-4  mx-auto box text-center">
        <h3 className="text-green">SAYLANI WELFARE</h3>
        <p className="text-blue mb-5">ONLINE MARKET PLACE</p>
        <Form onSubmit={handleSubmit}>
          <TextField
            className="w-100 mb-3"
            id="standard-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="w-100 mb-3"
            id="standard-basic"
            label="Contact"
            variant="standard"
            onChange={(e) => setContact(e.target.value)}
          />
          <TextField
            className="w-100 mb-3"
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="w-100 mb-3"
            id="standard-basic"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center mt-3">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="sale"
                control={<Radio />}
                label="Sale"
                onChange={(e) => setType(e.target.value)}
              />
              <FormControlLabel
                onChange={(e) => setType(e.target.value)}
                value="purchase"
                control={<Radio />}
                label="Purchase"
              />
            </RadioGroup>
          </div>

          <Button className="bg-green mt-5 px-5" size="lg" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
      <div className="box mt-2 text-center text-secondary">
        Already have an account? <Link to="/signin">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
