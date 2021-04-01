import {userDocument} from "../services/Db";
import firebase from "firebase";
import {Tag} from "./Tag";
import {sortBy} from "sort-by-typescript";

type User = firebase.User;

export class TagsDb {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    tagsCollection() {
        return userDocument(this.user).collection("tags");
    }

    add(tag: Tag) {
        this.tagsCollection().add(tag)
    }

    delete(tag: Tag) {
        this.tagsCollection().doc(tag.id).delete()
    }

    snapshot(callback: (tags:Array<Tag>) => void) {
        return this.tagsCollection().onSnapshot({
            next: snapshot => {
                return callback(snapshot.docs.map(this.documentToTag).sort(sortBy("name^")));
            },
            error: (e) => console.error(e)
        });
    }

    private documentToTag(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        return {...doc.data(), id: doc.id} as Tag;
    }
}

