import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";
import { auth, db } from "../config/FirebaseConfig";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    // return signInWithEmailAndPassword(auth, email, password);
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      swal("Good job!", "You are logged in sucessfully!", "success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (!errorMessage) {
      swal("Good job!", "You are logged in sucessfully!", "success");
      } else if (!email || !password) {
        swal(
          "All fields required",
          "Please fill all the given fields!",
          "error"
        );
      } else if (errorCode == "auth/invalid-email") {
        swal("Email!", "Please Enter Valid Email", "error");
      }else if (errorCode == "auth/user-not-found") {
        swal("Email!", "Email not found", "error");
      } else if (errorCode == "auth/wrong-password") {
        swal("Password!", "Please enter correct password", "error");
      }
    });
  }
  function signUp(name, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(collection(db, "users"), {
          name: name,
          email: email,
          password: password,
          uid: user.uid,
        })
          .then(() => {
            swal("Welcome", "You have signed up sucessfully!", "success");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (!error.message) {
          swal("Welcome", "You have signed up sucessfully!", "success");
        } else if (!name || !email || !password) {
          swal(
            "All fields required",
            "Please fill all the given fields!",
            "error"
          );
        } else if (errorCode == "auth/invalid-email") {
          swal("Email!", "Please Enter Valid Email", "error");
        } else if (errorCode == "auth/weak-password") {
          swal("Password!", "Password should have atleast 6 characters", "error");
        } else {
          swal("Email!", "Email already exist", "error");
        }
      });
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
