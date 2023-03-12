import React from "react";
import { auth } from "../../config/FirebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserAuth } from "../../context/UserAuthContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import SmsIcon from '@mui/icons-material/Sms';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
export default function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [type, setType] = useState();

  const { user } = useUserAuth();

  const getUser = () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    return new Promise((resolve, reject) => {
      getDocs(q).then((querySnapshot) => {
        let typ;
        querySnapshot.forEach((doc) => {
          typ = doc.data().type;
        });
        if (typ) {
          resolve(typ);
        } else {
          reject("No type found.");
        }
      });
    });
  };

  getUser()
    .then((typ) => {
      setType(typ)
    })
    .catch((error) => {
      console.error(error);
    });

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setShow(false);
    });
  };

  return (
    <div>
      <div className="bg-light mb-5">
        <nav className="navbar navbar-expand-lg nav-bg fixed-top bg-light mb-5">
          <div className="container-fluid">
            <Link className="navbar-brand text-grey" to={"/home"}>
              <p className="text-green m-0" style={{ fontSize: "20px" }}>
                SAYLANI WELFARE
              </p>
              <p className="text-blue m-0 d-flex justify-content-center" style={{ fontSize: "10px", fontWeight: "800" }}>
                ONLINE MARKET PLACE

              </p>
            </Link>
            <div className="d-lg-none" onClick={handleShow}>
              <MenuIcon style={{ color: "#6D6E71" }}></MenuIcon>
            </div>
            <div className="collapse navbar-collapse flex-grow-0" id="navbarText">
              {
                (type == "purchase") ?
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                      <Link className="nav-link text-grey d-flex  justify-content-center flex-column" to={"/home"}>
                        <HomeIcon className="mx-2" ></HomeIcon>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-grey d-flex justify-content-center flex-column" to={"/"}>
                        <SmsIcon className="mx-3"></SmsIcon>
                        Messages
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-grey d-flex justify-content-center flex-column" to={"/cart"}>
                        <ShoppingCartIcon className="mx-1"></ShoppingCartIcon>
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link text-grey d-flex justify-content-center flex-column" to={"/"}>
                        <PersonIcon className="mx-3"></PersonIcon>
                        Account
                      </Link>
                    </li>
                  </ul> :

                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                      <Link className="nav-link text-grey d-flex  justify-content-center flex-column" to={"/home"}>
                        <HomeIcon className="mx-2" ></HomeIcon>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-grey d-flex justify-content-center flex-column" to={"/addProduct"}>
                        <ControlPointIcon className="mx-4"></ControlPointIcon>

                        Add Items
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link text-grey d-flex justify-content-center flex-column" to={"/"}>
                        <PersonIcon className="mx-3"></PersonIcon>
                        Account
                      </Link>
                    </li>
                  </ul>
              }
            </div>
          </div>
        </nav>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="bg-light text-grey"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <Link className="navbar-brand text-grey" to={"/home"}>
              <p className="text-green m-0" style={{ fontSize: "20px" }}>
                SAYLANI WELFARE
              </p>
              <p className="text-blue m-0 d-flex justify-content-center" style={{ fontSize: "10px", fontWeight: "800" }}>
                ONLINE MARKET PLACE

              </p>
            </Link>
          </Offcanvas.Title>
          <CloseIcon onClick={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="py-3">
            {
              (type == "purchase") ?
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link className="nav-link text-grey" to={"/home"} onClick={handleClose}>
                      <HomeIcon className="mx-2" ></HomeIcon>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-grey" to={"/"} onClick={handleClose}>
                      <SmsIcon className="mx-2"></SmsIcon>
                      Messages
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-grey" to={"/cart"} onClick={handleClose}>
                      <ShoppingCartIcon className="mx-2"></ShoppingCartIcon>
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link text-grey" to={"/"} onClick={handleClose}>
                      <PersonIcon className="mx-2"></PersonIcon>
                      Account
                    </Link>
                  </li>
                </ul> :

                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link className="nav-link text-grey" to={"/home"} onClick={handleClose}>
                      <HomeIcon className="mx-2" ></HomeIcon>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-grey" to={"/addProduct"} onClick={handleClose}>
                      <ControlPointIcon className="mx-2"></ControlPointIcon>

                      Add Items
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link text-grey" to={"/"} onClick={handleClose}>
                      <PersonIcon className="mx-2"></PersonIcon>
                      Account
                    </Link>
                  </li>
                </ul>
            }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

  );
}
