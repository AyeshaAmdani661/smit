import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";
import { db } from "../config/FirebaseConfig";

const classContext = createContext();

export function classContextProvider({ children }) {
    // const { user } = useUserAuth();


  function addClass(courseName, section,room,startTiming,endTiming,createdBy) {
        addDoc(collection(db, "users"), {
            courseName,
            section,
            room,
            startTiming,
            endTiming
            ,createdBy
        })
          .then(() => {
            swal("Welcome", "You have signed up sucessfully!", "success");
          })
          .catch((error) => {
            console.log(error.message);
          });
  }

  return (
    <classContext.Provider
      value={{ addClass }}
    >
      {children}
    </classContext.Provider>
  );
}

export function classInfo() {
  return useContext(classContext);
}
