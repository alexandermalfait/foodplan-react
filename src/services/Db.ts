import firebaseApp from "./Firebase";
import {Dish} from "../dishes/Dish";

export const db = firebaseApp.firestore()

export function snapshotDishes(callback:(dishes: Array<Dish>) => void): () => void {
    return db
        .collection("dishes")
        .onSnapshot({
            next: snapshot => callback(snapshot.docs.map(d => {
                const dish = d.data() as Dish
                dish.id = d.id
                return dish;
            })),
            error: () => alert("error")
        })
}
