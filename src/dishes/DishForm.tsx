import {Controller, useForm} from "react-hook-form";
import {Button, createStyles, Grid, makeStyles, TextField} from "@material-ui/core";
import {FileUpload} from "../common/FileUpload";
import {Link} from "react-router-dom";
import React from "react";
import {Dish} from "./Dish";
import {Delete, HourglassEmpty, Save} from "@material-ui/icons";
import {FormButtons} from "../common/FormButtons";
import {TagSelector} from "../tags/TagSelector";

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

type Props = {
    onSubmit: (dish: DishFormValue) => void,
    currentValue?: DishFormValue,
    onDeleteDish?: () => void,
    isSaving: boolean
};

export function DishForm({onSubmit, currentValue, onDeleteDish, isSaving}: Props) {
    const {register, handleSubmit, control} = useForm({defaultValues: currentValue})

    const classes = useStyles()

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
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
                    <TextField
                        label="Dish Notes"
                        fullWidth
                        inputRef={register}
                        name="notes"
                        multiline
                        rows={3}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="tags"
                        defaultValue={[]}
                        render={({onChange, value}) => <TagSelector initialTags={value} onChange={onChange} />}
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

                <Grid item xs={12}>
                    <FormButtons
                        left={
                            <>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={isSaving ? <HourglassEmpty /> : <Save />}
                                    disabled={isSaving}
                                >
                                    Save it
                                </Button>
                            </>

                        }
                        right={
                            <>
                                {currentValue?.id &&
                                    <Button variant="contained" color="secondary" startIcon={<Delete />} onClick={onDeleteDish}>
                                        Delete
                                    </Button>
                                }


                                <Button color="secondary">
                                    <Link to="/dishes">Cancel</Link>
                                </Button>
                            </>
                        }
                    />
                </Grid>
            </Grid>
        </form>
    </>;
}