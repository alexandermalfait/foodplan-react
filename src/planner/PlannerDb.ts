import {Db} from "../services/Db";
import firebase from "firebase";
import {Dish} from "../dishes/Dish";
import {useContext, useMemo} from "react";
import {AuthContext} from "../services/Auth";
import {Planning} from "./Planning";

export function usePlannerDb() {
    const currentUser = useContext(AuthContext);

    return useMemo(() => new PlannerDb(currentUser!), [currentUser])
}

export const DATE_FORMAT = "YYYY-MM-DD"

export class PlannerDb extends Db {

    private planningCollection() {
        return this.userDocument().collection("planning");
    }

    add(date: Date, dish: Dish) {
        return this.planningCollection().add({
            date: date,
            dish: dish
        })
    }

    list(from: Date, to: Date) {
        return this
            .planningCollection()
            .where("date", ">=", from)
            .where("date", "<=", to)
            .get()
            .then(r => r.docs.map(this.documentToPlanning))
    }

    private documentToPlanning(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>):Planning {
        const data = doc.data()!

        return {
            id: doc.id,
            date: data.date.toDate(),
            dish: data.dish as Dish
        }
    }

    delete(planning: Planning) {
        return this.planningCollection().doc(planning.id).delete()
    }
}

