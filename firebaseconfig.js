import firebase from 'firebase-admin';
import serviceAccount from './firebase-key.json' assert{ type: "json"};


const firebaseConfig = {

    apiKey: "AIzaSyBMW_ZFYjm0oEI67PAWBxELdhjukZYwKRA",

    authDomain: "icecream-732e3.firebaseapp.com",
  
    projectId: "icecream-732e3",
  
    storageBucket: "icecream-732e3.appspot.com",
  
    messagingSenderId: "845132449826",
  
    appId: "1:845132449826:web:e8314961279208ac09a27b",
  
    measurementId: "G-BKB5L95EKB"
  
  };

  firebase.initializeApp({
    credential : firebase.credential.cert(serviceAccount)
  });
  const db = firebase.firestore(); 
  const User = db.collection("Users");
  export default User;
  
  