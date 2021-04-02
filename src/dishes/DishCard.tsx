import {Dish} from "./Dish";
import {CardMedia, createStyles, makeStyles, Paper} from "@material-ui/core";
import {TagIcon} from "../tags/TagIcon";

const useStyles = makeStyles(createStyles({
    root: {
        display: "flex",
        cursor: "pointer",
        height: "100%"
    },

    content: {
        padding: ".5em",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    },

    title: {
        display: "block",
        fontSize: "1.2em",
        marginBottom: "auto",
    } ,

    tags: {

    } ,

    tag: {
        display: "inline-block",
        fontSize: ".8em",

        "& .tag-icon": {
            fontSize: "1em",
            verticalAlign: "middle",
        }
    } ,

    image: {
        flex: "0 0 30%",
        minHeight: "80px",
        display: "flex",
        backgroundSize: "cover"
    },
}))

export function DishCard({dish, onClick}: { dish: Dish, onClick: () => void }) {
    const classes = useStyles()

    const imageUrl = dish.imageRefs && dish.imageRefs[0].url

    return <Paper className={classes.root} onClick={onClick}>
        <div className={classes.content}>
            <strong className={classes.title} title={dish.name}>{dish.name}</strong>

            {dish.tags && <div className={classes.tags}>
                {dish.tags.map(tag =>
                    <div className={classes.tag} key={tag.id}>
                        <TagIcon tag={tag} withLabel />
                    </div>
                )}
            </div>}
        </div>

        {imageUrl && <CardMedia image={imageUrl} className={classes.image} />}
    </Paper>;
}