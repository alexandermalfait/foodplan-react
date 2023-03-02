import {Dish} from "./Dish";
import {createStyles, makeStyles, Paper} from "@material-ui/core";
import {TagIcon} from "../tags/TagIcon";
import {Http} from "@material-ui/icons";
import React from "react";
import {DishNotes} from "./DishNotes";

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
        display: "inline-block",
        cursor: "pointer",
        "& svg": {
            fontSize: "1.7em",
            verticalAlign: "middle",
        }
    } ,

    image: {
        flex: "0 0 20%",
        minHeight: "80px",
        maxHeight: "110px",
        cursor: "pointer",
        display: "flex",

        "& img": {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        }
    },
}))

interface Props {
    dish: Dish

    className?: string

    onClick?: () => void

    titleControls?: React.ReactNode
}

function needControls(dish: Dish):boolean {
    return !!(dish.tags || dish.url || dish.notes);
}

export function DishCard({dish, onClick, className, titleControls}: Props) {
    const classes = useStyles()

    const thumbnailUrl = dish.imageThumbnailRefs && dish.imageThumbnailRefs[0]?.url
    const imageUrl = dish.imageRefs && dish.imageRefs[0]?.url

    const borderColor = ( dish.tags.length > 0 && dish.tags[0].color ) || undefined;

    return <Paper
        className={`${classes.root} ${className || ""}`}
        variant={"outlined"}
        style={{ borderColor: borderColor }}
    >
        <div className={classes.content}>
            <span className={classes.title} title={dish.name} onClick={onClick}>
                {dish.name}

                {titleControls}
            </span>

            {needControls(dish) &&
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

                    {dish.notes &&
                        <DishNotes notes={dish.notes} />
                    }
                </div>
            }

        </div>

        {imageUrl &&
            <a className={classes.image} href={imageUrl!} target="_blank" rel="noreferrer">
                <img src={thumbnailUrl || imageUrl!} alt={dish.name} loading="lazy" />
            </a>
        }
    </Paper>;
}