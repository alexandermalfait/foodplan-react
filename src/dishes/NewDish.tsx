import {Button, createStyles, Grid, makeStyles, TextField} from "@material-ui/core";
import React from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {Dish} from "./Dish";
import {FormWrapper} from "../common/FormWrapper";

const useStyles = makeStyles(() => createStyles(({
    buttons: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    }
})))

function DishForm() {
    const {register, handleSubmit} = useForm()

    const classes = useStyles()

    const onSubmit = (dish: Dish) => console.log(dish)

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Dish name"
                        required={true}
                        inputRef={register}
                        name={"name"}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Dish URL"
                        type="url"
                        fullWidth
                        placeholder="http://some-url"
                        inputRef={register}
                        name="url"
                    />
                </Grid>

                <Grid item xs={12} className={classes.buttons}>
                    <Button type="submit" variant="contained" color="primary">Save it</Button>

                    <Button color="secondary">
                        <Link to="/dishes">Cancel</Link>
                    </Button>
                </Grid>
            </Grid>
        </form>
    </>;
}

export function NewDish() {
    return <>
        <FormWrapper title="New Dish">
            <DishForm/>
        </FormWrapper>
    </>;
}