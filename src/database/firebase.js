// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {initializeFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFcvG8QvQRojrIfoQ_USxCJEAOYQXwDRA",
  authDomain: "minuevohogar-addb7.firebaseapp.com",
  projectId: "minuevohogar-addb7",
  storageBucket: "minuevohogar-addb7.appspot.com",
  messagingSenderId: "617614019125",
  appId: "1:617614019125:web:343873c6a1e4fa57c6ff7c",
  measurementId: "G-5JKKTJNVBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const authentication = getAuth(app);
//const analytics = getAnalytics(app);

export{
    db,
    authentication
}