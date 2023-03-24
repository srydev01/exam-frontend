import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3gOEaqg9PxxR12d-KtQv3cieGbWWUqxo",
  authDomain: "test-frontend-37065.firebaseapp.com",
  databaseURL: "https://test-frontend-37065-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-frontend-37065",
  storageBucket: "test-frontend-37065.appspot.com",
  messagingSenderId: "260854597291",
  appId: "1:260854597291:web:eef9681c39fc08461f59ee"
};

const firebase = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebase);
const firestore = getFirestore(firebase);
export { firebase, database, firestore }