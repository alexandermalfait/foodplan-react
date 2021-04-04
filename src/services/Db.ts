import firebaseApp from "./Firebase";
import firebase from "firebase";

export const db = firebaseApp.firestore()

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
