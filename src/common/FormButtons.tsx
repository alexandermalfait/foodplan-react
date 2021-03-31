import React, {ReactNode} from "react";
import {createStyles, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => createStyles(({
    root: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    } ,

    left: {
        marginRight: "auto",

        "& button": {
            marginRight: "1em"
        }
    },

    right: {
        "& button": {
            marginLeft: "1em"
        }
    }
})))

export function FormButtons({left, right}: { left?: ReactNode, right?: ReactNode }) {
    const classes = useStyles()

    return <>
        <div className={classes.root}>
            {left &&
                <div className={classes.left}>
                    {left}
                </div>
            }

            {right &&
                <div className={classes.right}>
                    {right}
                </div>
            }
        </div>
    </>;
}