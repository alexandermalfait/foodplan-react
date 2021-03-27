import firebaseApp from "./Firebase";
import {Dish} from "../dishes/Dish";
import firebase from "firebase";

export const db = firebaseApp.firestore()

type User = firebase.User;

function setUserId(record: { uid: string }, user: firebase.User) {
    record.uid = user.uid
}

export function addDish(dish: Dish, user: User) {
    setUserId(dish, user)

    db.collection("dishes").add(dish)
}

export function snapshotDishes(callback:(dishes: Array<Dish>) => void): () => void {
    return db
        .collection("dishes")
        .onSnapshot({
            next: snapshot => {
                const dishes = snapshot.docs
                    .map(d => {
                        const dish = d.data() as Dish
                        dish.id = d.id
                        return dish;
                    })
                    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

                return callback(dishes);
            },
            error: () => alert("error")
        })
}

