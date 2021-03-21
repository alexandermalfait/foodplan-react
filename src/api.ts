import * as rm from 'typed-rest-client/RestClient'

interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

const restClient = new rm.RestClient("foodplan", "https://jsonplaceholder.typicode.com")

export function fetchPhotos(): Promise<Array<Photo>> {
    return restClient.get<Array<Photo>>("photos").then(res => res.result!.slice(0, 50))
}
