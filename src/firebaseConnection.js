import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBUNXRz5pfHUCICJnbICZnaHFd0OPXiYZY",
    authDomain: "meuapp-4e5cd.firebaseapp.com",
    databaseURL: "https://meuapp-4e5cd.firebaseio.com",
    projectId: "meuapp-4e5cd",
    storageBucket: "meuapp-4e5cd.appspot.com",
    messagingSenderId: "743665203720",
    appId: "1:743665203720:web:3f44f5fd4e7f4203ed6fbd",
    measurementId: "G-F13L9TRCYV"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;