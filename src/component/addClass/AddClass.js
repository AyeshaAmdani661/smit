import React, { useState } from 'react'
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";
import { db } from "../../config/FirebaseConfig";
import { useUserAuth } from '../../context/UserAuthContext';
import { classInfo } from '../../context/classContext';

export default function AddClass() {

const [courseName, setCourseName] = useState("");
const [section, setSection] = useState("");
const [room, setRoom] = useState("");
const [startTiming, setStartTiming] = useState("");
const [endTiming, setEndTiming] = useState("");
const [createdBy, setCreatedBy] = useState("");
const { user } = useUserAuth();
setCreatedBy=user.email;
const { addClass } = classInfo();


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addClass(courseName, section,room,startTiming,endTiming,createdBy);
      // navigate("/home");
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div className='row py-5'>
      <div className='col-md-5 mx-auto text-center'>
        <h3 className='text-secondary my-5'>Add Class Details</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="courseName">
            <Form.Control
              type="text"
              placeholder="Course Name"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="section">
            <Form.Control
              type="text"
              placeholder="Section"
              onChange={(e) => setSection(e.target.value)}
            />       
          </Form.Group>
          <Form.Group className="mb-3" controlId="room">
            <Form.Control
              type="number"
              placeholder="Room Number"
              onChange={(e) => setRoom(e.target.value)}
            />       
          </Form.Group>
          <Form.Group className="mb-3" controlId="timing">
            <Form.Control
              type="number"
              placeholder="Start Timing"
              onChange={(e) => setStartTiming(e.target.value)}
            />       
          </Form.Group>
          <Form.Group className="mb-3" controlId="timing">
            <Form.Control
              type="number"
              placeholder="End Timing"
              onChange={(e) => setEndTiming(e.target.value)}
            />       
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              submit
            </Button>
          </div>
        </Form>
        </div>
    </div>
  )
}
