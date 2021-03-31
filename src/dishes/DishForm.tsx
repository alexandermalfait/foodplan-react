import {Controller, useForm} from "react-hook-form";
import {Button, createStyles, Grid, makeStyles, TextField} from "@material-ui/core";
import {FileUpload} from "./FileUpload";
import {Link} from "react-router-dom";
import React from "react";
import {Dish} from "./Dish";

const useStyles = makeStyles(() => createStyles(({
    buttons: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    } ,

    imageField: {
        marginTop: "1em"
    }
})))

export interface DishFormValue extends Dish {
    selectedFiles?: FileList
}

export function DishForm({onSubmit, currentValue}: { onSubmit: (dish: DishFormValue) => void, currentValue?: DishFormValue }) {
    const {register, handleSubmit, control} = useForm({defaultValues: currentValue})

    const classes = useStyles()

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

                <Grid item xs={12} className={classes.imageField}>
                    <Controller
                        control={control}
                        name="selectedFiles"
                        defaultValue={null}
                        render={({onChange}) => <FileUpload onChange={onChange}/>}
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