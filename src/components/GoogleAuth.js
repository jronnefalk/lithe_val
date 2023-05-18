import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { MenyKnapp } from "../styles/Knappar.styled";
import { MenyText } from "../styles/Text.styled";
import { BsPerson, BsPersonFill } from "react-icons/bs";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const GoogleAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        console.log("User is logged in.");
      } else {
        setLoggedIn(false);
        console.log("User is not logged in.");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const googleSignin = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then(function (result) {
        setLoggedIn(true);
        setTimeout(() => {
          googleSignout();
        }, 7200000); // sign out after 2 hours
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const googleSignout = () => {
    if (auth.currentUser) {
      signOut(auth)
        .then(function () {
          console.log("Signout Successful");
          setLoggedIn(false);
        })
        .catch(function (error) {
          console.log("Signout Failed:", error.message);
        });
    } else {
      console.log("No user signed in");
    }
  };

  return (
    <>
      {!loggedIn && (
        <MenyKnapp onClick={googleSignin}>
          <BsPerson size={33} /> <MenyText>Logga in</MenyText>
        </MenyKnapp>
      )}
      {loggedIn && (
        <MenyKnapp onClick={googleSignout}>
          {" "}
          <BsPersonFill size={33} /> <MenyText>Logga ut</MenyText>
        </MenyKnapp>
      )}
    </>
  );
};

export default React.memo(GoogleAuth);
