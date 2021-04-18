import {Tag} from "../tags/Tag";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Dish {

    id: string,

    uid: string,

    name: string

    url?: string

    imageRefs: Array<{path: string, url: string}>

    tags: Array<Tag>

    addedAt: Timestamp
}