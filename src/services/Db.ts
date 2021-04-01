import firebaseApp from "./Firebase";
import firebase from "firebase";

export const db = firebaseApp.firestore()

type User = firebase.User;

export function userDocument(user: User) {
    return db.collection("users").doc(user.uid);
}

