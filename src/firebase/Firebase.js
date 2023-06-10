

import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore"; 
//importing firestore data 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
export const animeRef= collection(db,"anime");
export const reviewsRef= collection(db,"reviews");
export const usersRef= collection(db,"users");
export default app;
