import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Card from 'react-bootstrap/Card';
import Navbar from '../navbar/Navbar';

export default function Cart() {
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
    return (
        <div>
            <Navbar />
            <div className="row pt-5 px-3 px-md-5">
                {products.map((product, i) => (
                    <div key={i} className="col-12">
                        <div className="row">
                            <div className="col-3 mb-2">
                                <img className="rounded-4 border-2 shadow" style={{ height: "10rem", width: "16rem" }} src={product.imageUrl} />
                            </div>
                            <div className="col-2 d-flex align-items-center" style={{ fontSize: "25px" }}>{product.pname}</div>
                            <div className="col-7 d-flex align-items-center justify-content-between" style={{ fontSize: "25px" }}>
                                <div>{product.price}</div></div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
