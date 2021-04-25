import firebase from "firebase";
import {Tag} from "./Tag";
import {sortBy} from "sort-by-typescript";
import {Db} from "../services/Db";
import {useContext, useMemo} from "react";
import {AuthContext} from "../services/Auth";

export function useTagsDb() {
    const currentUser = useContext(AuthContext);

    return useMemo(() => new TagsDb(currentUser!), [currentUser])
}


export class TagsDb extends Db {
    private tagsCollection() {
        return this.userDocument().collection("tags");
    }

    add(tag: Tag) {
        return this.tagsCollection().add(tag)
    }

    delete(tag: Tag) {
        return this.tagsCollection().doc(tag.id).delete()
    }

    list():Promise<Array<Tag>> {
        return this.tagsCollection().get().then(r => r.docs.map(this.documentToTag).sort(sortBy("name^")))
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

