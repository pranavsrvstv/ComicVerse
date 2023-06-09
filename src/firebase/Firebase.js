

import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore"; 
//importing firestore data 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAadtxzH6tTrqgGVj6MBk-ktqn1-zA__14",
  authDomain: "pranav-cloudfunctions.firebaseapp.com",
  projectId: "pranav-cloudfunctions",
  storageBucket: "pranav-cloudfunctions.appspot.com",
  messagingSenderId: "1037615127993",
  appId: "1:1037615127993:web:d00fa76b507cd79d26ea68"
};

const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
export const animeRef= collection(db,"anime");
export const reviewsRef= collection(db,"reviews");
export const usersRef= collection(db,"users");
export default app;
