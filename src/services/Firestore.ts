import firebaseApp from "./Firebase";
import {Dish} from "../dishes/Dish";

const firestore = firebaseApp.firestore()

export function fetchDishes(): Promise<Array<Dish>> {
    return firestore.collection("dishes").get().then(
        snapshot => snapshot.docs.map(x => x.data() as Dish)
    )
}
