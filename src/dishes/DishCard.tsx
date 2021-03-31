import {Dish} from "./Dish";
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
    const classes = useStyles()

    const imageUrl = dish.imageRefs && dish.imageRefs[0].url

    return <Card className={classes.root}>
        <CardHeader title={dish.name} className={classes.header}/>

        {imageUrl && <CardMedia image={imageUrl} className={classes.image} />}
    </Card>;
}