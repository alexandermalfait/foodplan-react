import {createStyles, makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    paper: {
        padding: theme.spacing(3)
    },

    title: {
        fontSize: "2em",
        marginBottom: ".5em"
    }
}))

export const FormWrapper = ({title, children}: { title: string, children: React.ReactNode }) => {
    const classes = useStyles()

    return <>
        <Paper className={classes.paper}>
            <Typography variant="h1" className={classes.title}>{title}</Typography>
            {children}
        </Paper>
    </>
}