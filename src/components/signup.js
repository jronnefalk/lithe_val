
import app from "../firebase_setup/firebase.js";
import React, { useState,useEffect } from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

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
    provider.setCustomParameters({ prompt: 'select_account' });
      signInWithPopup(auth, provider)
      .then(function(result){
        const credential = GoogleAuthProvider.credentialFromResult(result);
        var token = credential.accessToken;
        setLoggedIn(true);
        console.log(token);
        
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  }
      function googleSignout() {
        if (auth.currentUser) {
          signOut(auth)
            .then(function() {
              console.log('Signout Successful');
              setLoggedIn(false);
            })
            .catch(function(error) {
              console.log('Signout Failed:', error.message);
            });
        } else {
          console.log('No user signed in');
        }
      }

      return (
        <>
          {!loggedIn && <button onClick={googleSignin}>Google Signin</button>}
          {loggedIn && <button onClick={googleSignout}>Google Signout</button>}
        </>
          );
}

export default GoogleAuth;

