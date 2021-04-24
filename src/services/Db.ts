import firebaseApp from "./Firebase";
import firebase from "firebase";

export const db = firebaseApp.firestore()

if (process.env.REACT_APP_USE_EMULATOR === "true") {
    db.useEmulator("localhost", 5050)
}

export const firestoreTimestamp = firebase.firestore.Timestamp;

type User = firebase.User;

export abstract class Db {
    protected user: User;

    constructor(user: User) {
        this.user = user;
    }

    protected userDocument() {
        return db.collection("users").doc(this.user.uid);
    }
}
