import {Dish} from "./Dish";
import {CardMedia, createStyles, makeStyles, Paper} from "@material-ui/core";
import {TagIcon} from "../tags/TagIcon";
import {Http} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(createStyles({
    root: {
        display: "flex",
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
        cursor: "pointer",
    } ,

    controls: {

    } ,

    tag: {
        display: "inline-block",
        fontSize: ".8em",
        marginRight: ".2em",

        "& .tag-icon": {
            fontSize: "1em",
            verticalAlign: "middle",
        }
    } ,

    link: {
        color: "gray",
        marginLeft: ".5em",
        "& svg": {
            fontSize: "1.7em",
            verticalAlign: "middle",
        }
    } ,

    image: {
        flex: "0 0 30%",
        minHeight: "80px",
        display: "flex",
        backgroundSize: "cover",
        cursor: "pointer"
    },
}))

interface Props {
    dish: Dish

    className?: string

    onClick?: () => void

    titleControls?: React.ReactNode
}

export function DishCard({dish, onClick, className, titleControls}: Props) {
    const classes = useStyles()

    const imageUrl = dish.imageRefs && dish.imageRefs[0].url

    function openImage(imageUrl: string) {
        window.open(imageUrl, "_blank", 'noopener,noreferrer');
    }

    return <Paper className={`${classes.root} ${className || ""}`}>
        <div className={classes.content}>
            <strong className={classes.title} title={dish.name} onClick={onClick}>
                {dish.name}

                {titleControls}
            </strong>

            {(dish.tags || dish.url) &&
                <div className={classes.controls}>
                    {dish.tags && dish.tags.map(tag =>
                        <div className={classes.tag} key={tag.id}>
                            <TagIcon tag={tag} withLabel />
                        </div>
                    )}

                    {dish.url &&
                        <a href={dish.url} target="_blank" rel="noreferrer" className={classes.link}>
                            <Http />
                        </a>
                    }
                </div>
            }

        </div>

        {imageUrl && <CardMedia image={imageUrl} className={classes.image} onClick={() => openImage(imageUrl)} />}
    </Paper>;
}