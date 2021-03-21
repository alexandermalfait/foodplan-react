import * as rm from 'typed-rest-client/RestClient'
import {IRestResponse} from 'typed-rest-client/RestClient'

interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export async function fetchPhotos(): Promise<IRestResponse<Array<Photo>>> {
    const rest = new rm.RestClient("foodplan", "https://jsonplaceholder.typicode.com")

    return rest.get("photos")
}
