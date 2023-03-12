import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      // navigate("/home");
    } catch (err) {
      const errorCode = error.code;
        console.log(errorCode);
    }
  };


  return (
    <div className="row">
      <div className="p-5 box col-md-6 col-lg-4 mx-auto text-center">
      <h3 className="text-green">SAYLANI WELFARE</h3>
        <p className="text-blue">ONLINE MARKET PLACE</p>
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
            Login
          </Button>
        </Form>
        <div>
        </div>
      </div>
      <div className="box mt-3 text-center text-secondary">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default SignIn;
