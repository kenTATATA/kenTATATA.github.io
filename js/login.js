import { app } from "./firebase_config.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();

const submitButton = document.getElementById("submit");

if (submitButton != null) {
  submitButton.addEventListener("click", function () {
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        window.location.replace("http://127.0.0.1:5500/constructor/index.html");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("http://127.0.0.1:5500/constructor/index.html");
  } else {
    // User is signed out
    // ...
  }
});

// if (submitButton != null) {
//   submitButton.addEventListener("click", function () {
//     signIn(auth)
//       .then(() => {
//         console.log("bye");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// }
