import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { environment } from "../environments";

let firebaseApp: FirebaseApp;

export let firebaseAuth: Auth;

export let firestore: Firestore;

export const initFirebase = () => {
    console.log('Initializing Firebase ✨');
    firebaseApp = initializeApp(environment.firebase);
    firebaseAuth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
}

export type FirebaseUserModel = {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
}