import React from 'react'
import logo from "../../assets/images/Logo.png";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function WelcomeScreen() {
  return (
    <div>
      <div className="row">
        <div className="d-flex justify-content-center flex-column p-5 align-items-center col-md-5 mx-auto">
          <img src={logo} alt="logo" className='img-fluid'/>
          <h3 className='text-green'>
            SAYLANI WELFARE
          </h3>
          <p className='text-blue'>
            ONLINE MARKET PLACE
          </p>
          <Link  to={"/signin"}>
          <Button className='bg-green mt-5' size="lg">
          Get Started
        </Button>
          </Link>
        </div>
       
      </div>
    </div>
  )
}
