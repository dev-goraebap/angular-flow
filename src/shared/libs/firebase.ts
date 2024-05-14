import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { environment } from "../environments";

const firebaseConfig = {
    apiKey: environment.FIREBASE_API_KEY,
    authDomain: environment.FIREBASE_AUTH_DOMAIN,
    databaseURL: environment.FIREBASE_DATABASE_URL,
    projectId: environment.FIREBASE_PROJECT_ID,
};

let firebaseApp: FirebaseApp;

export let firebaseAuth: Auth;

export const initFirebase = () => {
    console.log('Initializing Firebase ✨');
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
}

export type FirebaseUserModel = {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
}