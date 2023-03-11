import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserAuth } from "../../context/UserAuthContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/images/cart.png";


export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      // navigate("/login");
      setShow(false)
    });
  };

  return (
    <div className="bg-primary mb-5">
      <nav className="navbar navbar-expand-lg nav-bg fixed-top bg-primary mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to={"/"}>
          <img src={logo} className="logo" />
            Navbar
          </Link>
          <div className="d-lg-none" onClick={handleShow}>
            <MenuIcon style={{ color: "#ffff" }}></MenuIcon>
          </div>
          <div className="collapse navbar-collapse flex-grow-0" id="navbarText">
            {!user ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/"}>
                    Home
                  </Link>
                </li>
                <Link className="nav-link text-light" to={"/about"}>
                  About
                </Link>
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/addClass"}>
                   Add Class
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/signup"}>
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/signin"}>
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/"}>
                    Home
                  </Link>
                </li>

                <li>
                <Link className="nav-link text-light" to={"/about"}>
                  About
                </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/addClass"}>
                   Add Class
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link text-light" onClick={handleLogout}>
                    Logout
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="bg-primary text-light"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <img src={logo} className="logo" />
            Navbar
          </Offcanvas.Title>
          <CloseIcon onClick={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="py-3">
          {!user ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/"}onClick={handleClose}>
                    Home
                  </Link>
                </li>

                <li>
                <Link className="nav-link text-light" to={"/about"}onClick={handleClose}>
                  About
                </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/addClass"}>
                   Add Class
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/signup"}onClick={handleClose}>
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/signin"}onClick={handleClose}>
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/"}onClick={handleClose}>
                    Home
                  </Link>
                </li>
                <Link className="nav-link text-light" to={"/about"}onClick={handleClose}>
                  About
                </Link>
                <li className="nav-item">
                  <Link className="nav-link text-light" to={"/addClass"}>
                   Add Class
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link text-light" onClick={handleLogout}>
                    Logout
                  </div>
                </li>
              </ul>
            )}
        </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
