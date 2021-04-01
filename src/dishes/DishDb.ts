import {Dish} from "./Dish";
import firebase from "firebase";
import {sortBy} from "sort-by-typescript";
import {userDocument} from "../services/Db";

import User = firebase.User;

export function addDish(dish: Dish, user: User) {
    userDocument(user).collection("dishes").add(dish)
}

export function updateDish(dish: Dish, user: User) {
    userDocument(user).collection("dishes").doc(dish.id).update(dish)
}

export function deleteDish(dish: Dish, user: User) {
    userDocument(user).collection("dishes").doc(dish.id).delete()
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