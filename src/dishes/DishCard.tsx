import {Dish} from "./Dish";
import {CardMedia, createStyles, makeStyles, Paper} from "@material-ui/core";
import {TagIcon} from "../tags/TagIcon";
import {Http} from "@material-ui/icons";
import React from "react";
import {downloadFile} from "../services/Firebase";
import {useQuery} from "react-query";

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
        flex: "0 0 20%",
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

    const { data:imageUrl } = useQuery<string|null>(
        [ "dishImageUrl", dish.id ],
        () => dish.imageThumbnailRefs && downloadFile(dish.imageThumbnailRefs[0].path),
        { staleTime: Infinity }
    )

    function openImage(imageUrl: string) {
        window.open(imageUrl, "_blank", 'noopener,noreferrer');
    }

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

        {imageUrl && <CardMedia image={imageUrl!} className={classes.image} onClick={() => openImage(imageUrl!)} />}
    </Paper>;
}