// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
  persistentMultipleTabManager,
  persistentSingleTabManager,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCUP4wDsH1rAXX3s2d_idCXCRxWrC1cHaE",
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  apiKey: "AIzaSyDbC-FouEJWjUg8JXbWy7KdSbOew46yuPU",
  authDomain: "dating-app-mern-6748d.firebaseapp.com",
  projectId: "dating-app-mern-6748d",
  storageBucket: "dating-app-mern-6748d.appspot.com",
  messagingSenderId: "684841859122",
  appId: "1:684841859122:web:7eb4a8f38cb006ebeba42b",
};

// Initialize Firebase for SSR
//To avoid boh CSR and SSR at the same time

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app); //firebase db
const auth = getAuth(app);
const storage = getStorage(app);

// import { CACHE_SIZE_UNLIMITED } from "firebase/firestore";

// const firestoreDb = initializeFirestore(app, {
//   cacheSizeBytes: CACHE_SIZE_UNLIMITED,
// });

export { app, firestore, auth, storage };
