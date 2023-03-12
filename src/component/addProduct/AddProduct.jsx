import React, { useState } from 'react'
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { db } from "../../config/FirebaseConfig";
import { useUserAuth } from '../../context/UserAuthContext';
import Navbar from '../navbar/Navbar';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";

export default function AddProduct() {
  const [pname, setPName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const [imageUrl, setImageUrl] = useState(null);

  const { user } = useUserAuth();

  const [name, setName] = useState();
  const getUser = () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    return new Promise((resolve, reject) => {
      getDocs(q).then((querySnapshot) => {
        let name;
        querySnapshot.forEach((doc) => {
          name = doc.data().name;
        });
        if (name) {
          resolve(name);
        } else {
          reject("No type found.");
        }
      });
    });
  };

  getUser()
    .then((name) => {
      setName(name)

    })
    .catch((error) => {
      console.error(error);
    });

  console.log(name)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "products"), {
        pname,
        quantity,
        imageUrl,
        price,
        description
      });
      console.log("Product added successfully!");
      swal("Congratulations!", "Your product added sucessfully!", "success");
      setPName("");
      setQuantity("");
      setImageUrl("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };
  return (
    <div>
      <div className='row py-md-5'>
        <div className='col-md-5 mx-auto text-center'>
          <div className="text-blue fw-bold fs-2">
            {name}
          </div>
          <div className="text-green mb-3">
            Sales
          </div>
          <hr className='my-2' />
          <div className="text-start ps-5 text-blue">Add New Item</div>

          <Form onSubmit={handleSubmit}>
            
            <TextField
              className="w-100 mb-3"
              id="standard-basic"
              label="Image Url"
              variant="standard"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <TextField
              className="w-100 mb-3"
              id="standard-basic"
              label="Name"
              variant="standard"
              value={pname}
              onChange={(event) => setPName(event.target.value)}
            />
            <TextField
              className="w-100 mb-3"
              id="standard-basic"
              label="Quantity"
              variant="standard"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <TextField
              className="w-100 mb-3"
              id="standard-basic"
              label="Price"
              variant="standard"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
              <TextField
              className="w-100 mb-3"
              id="standard-basic"
              label="Description"
              variant="standard"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button className="bg-green mt-5 px-3" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
