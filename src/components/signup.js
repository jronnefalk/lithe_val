
import app from "../firebase_setup/firebase.js";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

var provider = new GoogleAuthProvider();
const auth = getAuth();

function GoogleAuth() {
 
  function googleSignin() {
    provider.setCustomParameters({ prompt: 'select_account' });
      signInWithPopup(auth, provider)
      .then(function(result){
        const credential = GoogleAuthProvider.credentialFromResult(result);
        var token = credential.accessToken;
        var user = result.user;
        
        console.log(token);
        console.log(user);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        //const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  function googleSignout() {
    app.Auth()
      .signOut()
      .then(function() {
        console.log('Signout Successful');
      })
      .catch(function(error) {
        console.log('Signout Failed:', error.message);
      });
  }
  return (
    <>
      <button onClick={googleSignin}>Google Signin</button>
      <button onClick={googleSignout}>Google Signout</button>
    </>
  );
}

export default GoogleAuth;

