// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPXu4l00PUPCavCZDaSGNignSRlksh8Do",
    authDomain: "auth-swp.firebaseapp.com",
    projectId: "auth-swp",
    storageBucket: "auth-swp.appspot.com",
    messagingSenderId: "785459684149",
    appId: "1:785459684149:web:10861da9b15ba41261227c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
