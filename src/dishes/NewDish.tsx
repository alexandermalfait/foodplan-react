import {Button, createStyles, Grid, makeStyles, TextField} from "@material-ui/core";
import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import {Dish} from "./Dish";
import {FormWrapper} from "../common/FormWrapper";
import {AuthContext} from "../services/Auth";
import {addDish} from "../services/Db";
import firebaseApp from "../services/Firebase";

const useStyles = makeStyles(() => createStyles(({
    buttons: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    }
})))

interface DishFormValue extends Dish {
    selectedFiles: FileList
}

function DishForm({onSubmit}: { onSubmit: (dish: DishFormValue) => void }) {
    const {register, handleSubmit} = useForm()

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

                <Grid item xs={12}>
                    <input type="file" ref={register} name="selectedFiles" multiple={true}/>

                    <Button>Select image</Button>
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
    const currentUser = useContext(AuthContext);

    const history = useHistory()

    const saveDish = async (dishValue: DishFormValue) => {
        const {selectedFiles, ...dish} = dishValue

        const imageRefs = await Promise.all(Array.from(selectedFiles).map(file =>
            firebaseApp
                .storage()
                .ref(`images/${file.name}`)
                .put(file)
                .then((snapshot) => snapshot.ref.fullPath)
        ))

        dish.imageRefs = (dish.imageRefs || []).concat(imageRefs)

        addDish(dish, currentUser!)

        history.push("/dishes")
    };
    return <>
        <FormWrapper title="New Dish">
            <DishForm onSubmit={saveDish}/>
        </FormWrapper>
    </>;
}