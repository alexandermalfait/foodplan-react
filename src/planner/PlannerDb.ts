import {userDocument} from "../services/Db";
import firebase from "firebase";
import {Dish} from "../dishes/Dish";

export const DATE_FORMAT = "YYYY-MM-DD"

type User = firebase.User;

export class PlannerDb {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    private planningCollection() {
        return userDocument(this.user).collection("planning");
    }

    add(date: Date, dish: Dish) {
        return this.planningCollection().add({
            date: date,
            dish: dish
        })
    }

    /*delete(tag: Tag) {
        this.tagsCollection().doc(tag.id).delete()
    }

    list(): Promise<Array<Tag>> {
        return this.tagsCollection().get().then(r => r.docs.map(this.documentToTag).sort(sortBy("name^")))
    }

    snapshot(callback: (tags: Array<Tag>) => void) {
        return this.tagsCollection().onSnapshot({
            next: snapshot => {
                return callback(snapshot.docs.map(this.documentToTag).sort(sortBy("name^")));
            },
            error: (e) => console.error(e)
        });
    }

    private documentToTag(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        return {...doc.data(), id: doc.id} as Tag;
    }*/
}

