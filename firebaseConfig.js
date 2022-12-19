import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONST } from "./env";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_CONST.API_KEY,
  authDomain: FIREBASE_CONST.AUTH_DOMAIN,
  databaseURL: FIREBASE_CONST.DB_URL,
  projectId: FIREBASE_CONST.PROJECT_ID,
  storageBucket: FIREBASE_CONST.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONST.MESSAGING_SEN_ID,
  appId: FIREBASE_CONST.APP_ID,
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);
const storeService = getFirestore();
export const db = getFirestore(app);
