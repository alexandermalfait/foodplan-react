export interface Dish {

    id: string,

    uid: string,

    name: string

    url?: string

    imageRefs: Array<{path: string, url: string}>
}