import firebaseApp from "./Firebase";
import {Dish} from "../dishes/Dish";
import firebase from "firebase";
import {sortBy} from "sort-by-typescript";

export const db = firebaseApp.firestore()

type User = firebase.User;

function userDocument(user: User) {
    return db.collection("users").doc(user.uid);
}

export function addDish(dish: Dish, user: User) {
    userDocument(user).collection("dishes").add(dish)
}

export function updateDish(dish: Dish, user: User) {
    userDocument(user).collection("dishes").doc(dish.id).update(dish)
}

function documentToDish(d: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
    return {...d.data(), id: d.id} as Dish;
}

export function snapshotDishes(user: firebase.User, callback:(dishes: Array<Dish>) => void): () => void {
    return userDocument(user)
        .collection("dishes")
        .onSnapshot({
            next: snapshot => {
                const dishes = snapshot.docs
                    .map(documentToDish)
                    .sort(sortBy("name^")); // case insensitive

                return callback(dishes);
            },
            error: (e) => console.error(e)
        })
}

export async function fetchDishById(user: firebase.User, dishId: string): Promise<Dish> {
    const snapshot = await userDocument(user).collection("dishes").doc(dishId).get();

    return documentToDish(snapshot)
}