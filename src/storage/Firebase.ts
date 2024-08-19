// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCERVEU3gPKXZ62b9rTJ1ZGD3x8T8SO_ro",
  authDomain: "bezal-aa24a.firebaseapp.com",
  projectId: "bezal-aa24a",
  storageBucket: "bezal-aa24a.appspot.com",
  messagingSenderId: "869860901942",
  appId: "1:869860901942:web:0e4b6893d92577fd8b0497",
  measurementId: "G-BYJ7401QHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
