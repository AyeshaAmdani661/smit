import React from "react";
import Navbar from "../navbar/Navbar";
import { Button } from "react-bootstrap";
import vegetables from "../../assets/images/vegetables.png";
import seafood from "../../assets/images/seafood.png";
import oil from "../../assets/images/oil.png";
import meet from "../../assets/images/meet.png";
import fruit from "../../assets/images/fruit.png";
import grocery from "../../assets/images/Grocery.png";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import "./home.css"
import { useState, useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";


export default function Home() {

  const [type, setType] = useState();

  const { user } = useUserAuth();

  const [products, setProducts] = useState([]);

  // Fetch products data from the database
  useEffect(() => {
    const fetchProducts = async () => {
      const usersCollectionRef = collection(db, "products");
      const data = await getDocs(usersCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts()
  }, []);

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


  return (
    <div className="text-center ">
      <Navbar />
      {
        (type !== "purchase") ?
          <div>
            <h3 className="pt-5 text-blue">Choose your favorite
              fashion categories</h3>
            <h5 className="text-secondary">You can choose more than one</h5>
            <div className="row container mx-auto">
              <div className="col-6 col-md-4 col-lg-3">
                <Button className="button-light mt-5 px-3" size="lg">
                  <img src={fruit} alt="vegetables" className="pe-2" />
                  Fruits
                </Button>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <Button className="button-light mt-5 px-3" size="lg">
                  <img src={seafood} alt="vegetables" className="pe-2" />
                  Sea food
                </Button>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <Button className="button-light mt-5 px-3" size="lg">
                  <img src={meet} alt="vegetables" className="pe-2" />
                  Meet
                </Button>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <Button className="button-light mt-5 px-3" size="lg">
                  <img src={oil} alt="vegetables" className="pe-2" />
                  Oil
                </Button>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <Button className="button-light mt-5 px-3" size="lg">
                  <img src={vegetables} alt="vegetables" className="pe-2" />
                  Vegetables
                </Button>
              </div>

            </div>
            <Link to={"/addProduct"}>
              <Button className="bg-green mt-5 px-5" size="lg" type="submit">
                Continue
              </Button>
            </Link>
          </div>
          :
          <div className="pt-5 mt-5">
            <div className="row">
              <div className="col-11 mx-auto">
                <img src={grocery} alt="banner" className=" img-fluid" />
              </div>
              <div className="row px-3 px-md-5">
                {products.map((product, i) => (
                  <div key={i} className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <Link to={"/cart"}>
                    <Card className="d-flex justify-centent-center align-items-center flex-column py-auto border-0" style={{ height:"16rem" }}>
                      <Card.Img variant="top" className="rounded-4 border-2 shadow" style={{height:"16rem"}} src={product.imageUrl} />
                      {/* <Card.Body>
                        <Card.Title> {product.pname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{product.price}</Card.Subtitle>
                        <Card.Text className="text-truncate" style={{width:"16rem"}}>
                        {product.description}
                        </Card.Text>
                        
                        Link
                      </Card.Body> */}
                    </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
      }
    </div>
  )
}
