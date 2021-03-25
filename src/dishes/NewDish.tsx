import {Button, createStyles, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import React from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {Dish} from "./Dish";

const useStyles = makeStyles((theme) =>createStyles(({
    paper: {
        padding: theme.spacing(3)
    },

    buttons: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    }
})))

function DishForm() {
    const {register, handleSubmit } = useForm()

    const classes = useStyles()

    const onSubmit = (dishy: Dish) => console.log(dishy)

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Dish name" required={true} inputRef={register} name={"name"} fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Dish URL" type="url" fullWidth placeholder="http://some-url" inputRef={register} name="url" />
                    </Grid>

                    <Grid item xs={12} className={classes.buttons}>
                        <Button type="submit" variant="contained" color="primary">Save it</Button>

                        <Button color="secondary">
                            <Link to="/dishes">Cancel</Link>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    </>;
}

export function NewDish() {

    return <>
        <h1>New dish</h1>

        <DishForm/>
    </>;
}