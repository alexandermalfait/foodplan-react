import {Dish} from "./Dish";
import firebase from "firebase";
import {sortBy} from "sort-by-typescript";
import {Db,} from "../services/Db";
import {useContext, useMemo} from "react";
import {AuthContext} from "../services/Auth";

export function useDishDb() {
    const currentUser = useContext(AuthContext);

    return useMemo(() => new DishDb(currentUser!), [currentUser])
}

export class DishDb extends Db {
    private dishesCollection() {
        return this.userDocument().collection("dishes");
    }

    add(dish: Dish) {
        return this.dishesCollection().add(dish)
    }

    update(dish: Dish) {
        return this.dishesCollection().doc(dish.id).update(dish)
    }

    delete(dish: Dish) {
        return this.dishesCollection().doc(dish.id).delete()
    }

    documentToDish(d: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        return {...d.data(), id: d.id} as Dish;
    }

    snapshotDishes(callback: (dishes: Array<Dish>) => void) {
        return this.dishesCollection().onSnapshot({
            next: snapshot => {
                const dishes = snapshot.docs
                    .map(this.documentToDish)
                    .sort(sortBy("name^")); // case insensitive

                return callback(dishes);
            },
            error: (e) => console.error(e)
        })
    }

    async fetchDishById(dishId: string): Promise<Dish> {
        const snapshot = await this.dishesCollection().doc(dishId).get();

        return this.documentToDish(snapshot)
    }
}

