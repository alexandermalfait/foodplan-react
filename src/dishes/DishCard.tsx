import {Dish} from "./Dish";
import {useEffect, useState} from "react";
import firebaseApp from "../services/Firebase";
import {Card, CardHeader, CardMedia, createStyles, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(createStyles({
    root: {
        display: "flex",
        minHeight: "100px"
    },

    header: {
        width: "70%",
    },

    image: {
        width: "30%",
        backgroundSize: "contain"
    },
}))

export function DishCard({dish}: { dish: Dish }) {
    const [imageUrl, setImageUrl] = useState("")
    const classes = useStyles()

    useEffect(() => {
        if (dish.imageRefs) {
            firebaseApp.storage().ref(dish.imageRefs[0]).getDownloadURL().then(setImageUrl)
        }
    }, [dish.imageRefs])

    return <Card className={classes.root}>
        <CardHeader title={dish.name} className={classes.header}/>

        {imageUrl && <CardMedia image={imageUrl} className={classes.image} />}
    </Card>;
}