// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9lMU-awFwLSJKi_b0LigpeedXsVufhig",
  authDomain: "brainy-f2914.firebaseapp.com",
  projectId: "brainy-f2914",
  storageBucket: "brainy-f2914.appspot.com",
  messagingSenderId: "806484873944",
  appId: "1:806484873944:web:f047e6c5d04c62caa7bdad"
};

// Initialize Firebase
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for auth

const auth = firebase.auth();

export {auth};