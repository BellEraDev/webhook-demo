import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5BlWxhFYDrMcbhmIQTgwqxB8Ff2wyrUU",
  authDomain: "webhook-demo-cb4f9.firebaseapp.com",
  projectId: "webhook-demo-cb4f9",
  storageBucket: "webhook-demo-cb4f9.firebasestorage.app",
  messagingSenderId: "1039565153979",
  appId: "1:1039565153979:web:ccbc21e95f9d30d6f92b9e",
  measurementId: "G-EYLE738WHH"
};

let firebaseApp;
        
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0]; // if already initialized, use the existing one
}

const db = getFirestore(firebaseApp);

export { db, firebaseApp};