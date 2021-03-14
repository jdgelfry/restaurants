
import firebase from 'firebase/app';
import 'firebase/firestore'

 const  firebaseConfig = {
    apiKey: "AIzaSyCc19uLBemwo6rbNFvYDKcRoFy7u7q9PEY",
    authDomain: "restaurants-93dd7.firebaseapp.com",
    projectId: "restaurants-93dd7",
    storageBucket: "restaurants-93dd7.appspot.com",
    messagingSenderId: "66177654976",
    appId: "1:66177654976:web:bab6be1be4d598d3a24d25"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);