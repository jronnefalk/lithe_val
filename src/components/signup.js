import app from "../firebase_setup/firebase.js";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

//design
import "../design/meny.css";
//ikon
import { BsPerson } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";

var provider = new GoogleAuthProvider();
const auth = getAuth();

function GoogleAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  function googleSignin() {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then(function (result) {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //var token = credential.accessToken;
        //console.log(token);
        setLoggedIn(true);
        //var user = result.user;
        //console.log(user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  function googleSignout() {
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
  }

  return (
    <>
      <div class="loggain">
        {!loggedIn && (
          <button class="loggin_knapp" onClick={googleSignin}>
            <BsPerson size={32} /> <h1 class="text">Logga in</h1>
          </button>
        )}
        {loggedIn && (
          <button class="loggin_knapp" onClick={googleSignout}>
            {" "}
            <BsPersonFill size={32} /> <h1 class="text">Logga ut</h1>
          </button>
        )}
      </div>
    </>
  );
}

export default GoogleAuth;
