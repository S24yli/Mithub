import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDewDDOaUEoGrK6vhKAZd1nol1GJc7phiM",
  authDomain: "mithub-1868c.firebaseapp.com",
  projectId: "mithub-1868c",
  storageBucket: "mithub-1868c.appspot.com",
  messagingSenderId: "851864492106",
  appId: "1:851864492106:web:01adba00ee04a122bfaeb3",
  measurementId: "G-E2W3WQS0RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // ✅ Ensure `auth` is exported