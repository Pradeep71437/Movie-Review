// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDL5A5SGxoPzEZV54_0yjHfPuaurayG7fU",
    authDomain: "movie-review-41db5.firebaseapp.com",
    projectId: "movie-review-41db5",
    storageBucket: "movie-review-41db5.appspot.com",
    messagingSenderId: "844374723732",
    appId: "1:844374723732:web:65aaec8223288e867a7881", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
