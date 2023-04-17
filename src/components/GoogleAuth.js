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
      <div className="loggain">
        {!loggedIn && (
          <button className="loggin_knapp" onClick={googleSignin}>
            <BsPerson size={32} /> <h1 className="text">Logga in</h1>
          </button>
        )}
        {loggedIn && (
          <button className="loggin_knapp" onClick={googleSignout}>
            {" "}
            <BsPersonFill size={32} /> <h1 className="text">Logga ut</h1>
          </button>
        )}
      </div>
    </>
  );
}

export default GoogleAuth;
