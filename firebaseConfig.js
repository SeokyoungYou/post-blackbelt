import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import getEnvVars from "./environment";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: getEnvVars().API_KEY,
  authDomain: getEnvVars().AUTH_DOMAIN,
  databaseURL: getEnvVars().DATABASE_URL,
  projectId: getEnvVars().PROJECT_ID,
  storageBucket: getEnvVars().STORAGE_BUCKET,
  messagingSenderId: getEnvVars().MESSAGIN_ID,
  appId: getEnvVars().APP_ID,
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth();
