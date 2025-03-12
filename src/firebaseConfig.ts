// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmPlYai9cvQ6uibwiqwrvJDzB_DxPs6Lw",
  authDomain: "ofp-game.firebaseapp.com",
  projectId: "ofp-game",
  storageBucket: "ofp-game.firebasestorage.app",
  messagingSenderId: "165483268387",
  appId: "1:165483268387:web:fd233c91aadba830dae496",
  measurementId: "G-E5Y8TN46CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app, analytics };