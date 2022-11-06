import firebase from 'firebase/compat/app'

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ0keFiLxPf-dU1KHT2jjTzdTX9fUTczk",
  authDomain: "hack-cade.firebaseapp.com",
  projectId: "hack-cade",
  storageBucket: "hack-cade.appspot.com",
  messagingSenderId: "137328164757",
  appId: "1:137328164757:web:55ef166a163d85071e009c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);


