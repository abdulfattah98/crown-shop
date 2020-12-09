import firebase from "firebase/app"
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAKPWcKdUG3Lsy7DGvVjvyZuuz4pIzrNY",
    authDomain: "ecommerce-ab312.firebaseapp.com",
    databaseURL: "https://ecommerce-ab312.firebaseio.com",
    projectId: "ecommerce-ab312",
    storageBucket: "ecommerce-ab312.appspot.com",
    messagingSenderId: "414730173254",
    appId: "1:414730173254:web:a6f8b3b4fc87c2e6c44347",
    measurementId: "G-7W7T10LK6Y"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


