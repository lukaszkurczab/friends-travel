import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQYG6oeKY6Yqb-uGIighhpB9kPZOliXKI",
  authDomain: "friends-travel-3ea70.firebaseapp.com",
  projectId: "friends-travel-3ea70",
  storageBucket: "friends-travel-3ea70.firebasestorage.app",
  messagingSenderId: "435646682540",
  appId: "1:435646682540:web:34817268dfa41ebc9d1609",
  measurementId: "G-DDTR3BRMC1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
