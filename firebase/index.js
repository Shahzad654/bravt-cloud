// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Bkc8EmGMYDcLcMB3f46cUBq3ewKvL34",
  authDomain: "vps-web-app-82b2e.firebaseapp.com",
  projectId: "vps-web-app-82b2e",
  storageBucket: "vps-web-app-82b2e.firebasestorage.app",
  messagingSenderId: "763163235945",
  appId: "1:763163235945:web:c14d960b6b62b2913a74f8",
  measurementId: "G-16J8CLZSNT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
