import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDItumNsB0zpu8arw5kmFjm_8sd7Mf9z_0",
  authDomain: "cooking-ninja-site-fbb6b.firebaseapp.com",
  projectId: "cooking-ninja-site-fbb6b",
  storageBucket: "cooking-ninja-site-fbb6b.appspot.com",
  messagingSenderId: "274314332468",
  appId: "1:274314332468:web:b82d83b71849e945dabd61",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase

const projectFirestore = firebase.firestore();

export { projectFirestore };