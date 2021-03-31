import {Dish} from "./Dish";
import {Card, CardHeader, CardMedia, createStyles, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(createStyles({
    root: {
        display: "flex",
        minHeight: "100px",
        cursor: "pointer",
    },

    header: {
        width: "70%",
    },

    image: {
        width: "30%",
        display: "flex",
        backgroundSize: "cover"
    },
}))

export function DishCard({dish, onClick}: { dish: Dish, onClick: () => void }) {
    const classes = useStyles()

    const imageUrl = dish.imageRefs && dish.imageRefs[0].url

    return <Card className={classes.root} onClick={onClick}>
        <CardHeader title={dish.name} className={classes.header}/>

        {imageUrl && <CardMedia image={imageUrl} className={classes.image} />}
    </Card>;
}