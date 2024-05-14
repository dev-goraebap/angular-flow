import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { environment } from "../environments";

const firebaseConfig = {
    apiKey: environment.FIREBASE_API_KEY,
    authDomain: environment.FIREBASE_AUTH_DOMAIN,
    databaseURL: environment.FIREBASE_DATABASE_URL,
    projectId: environment.FIREBASE_PROJECT_ID,
};

let firebaseApp: FirebaseApp | null = null;

export let firebaseAuth: Auth | null = null;

export const initFirebase = () => {
    console.log('Initializing Firebase ✨');
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
}