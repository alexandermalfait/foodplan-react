import {Dish} from "./Dish";
import {useEffect, useState} from "react";
import firebaseApp from "../services/Firebase";
import {Card, CardHeader, CardMedia} from "@material-ui/core";

export function DishCard({dish}: { dish: Dish }) {
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        if (dish.imageRefs) {
            firebaseApp.storage().ref(dish.imageRefs[0]).getDownloadURL().then(setImageUrl)
        }
    }, [dish.imageRefs])

    return <Card style={{display: "flex"}}>
        <CardHeader title={dish.name} style={{width: "70%"}}/>

        {imageUrl && <CardMedia image={imageUrl} style={{width: "30%"}}/>}
    </Card>;
}