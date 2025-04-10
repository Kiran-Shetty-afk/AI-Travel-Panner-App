// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-HbF3UkpyzrPveFJGqz1I6CXQ6iPH7FM",
  authDomain: "ai-travel-planner-203f5.firebaseapp.com",
  projectId: "ai-travel-planner-203f5",
  storageBucket: "ai-travel-planner-203f5.firebasestorage.app",
  messagingSenderId: "378686512860",
  appId: "1:378686512860:web:1b33f3c0670ab6da289e19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);