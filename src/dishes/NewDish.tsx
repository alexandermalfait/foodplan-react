import {
    Button,
    createStyles,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField
} from "@material-ui/core";
import React, {useContext, useRef} from "react";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import {Dish} from "./Dish";
import {FormWrapper} from "../common/FormWrapper";
import {AuthContext} from "../services/Auth";
import {addDish} from "../services/Db";
import {uploadFiles} from "../services/Firebase";
import {AttachFile} from "@material-ui/icons";

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

interface DishFormValue extends Dish {
    selectedFiles: FileList
}

function FileSelection({ files } : { files: FileList }) {
    return <List>
        {Array.from(files).map(file =>
            <ListItem key={file.name}>
                <ListItemIcon>
                    <AttachFile />
                </ListItemIcon>
                <ListItemText>{file.name}</ListItemText>
            </ListItem>
        )}
    </List>;
}

function DishForm({onSubmit}: { onSubmit: (dish: DishFormValue) => void }) {
    const {register, handleSubmit, watch} = useForm()

    const fileFieldRef = useRef<HTMLInputElement|null>()

    const selectedFiles = watch("selectedFiles")

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
                    <input
                        type="file"
                        ref={(e) => { register(e); fileFieldRef.current = e; }}
                        name="selectedFiles"
                        multiple={true}
                        style={{display: "none"}}
                        accept="image/*"
                    />

                    <Button variant="contained" color="primary" onClick={() => fileFieldRef.current!.click()}>Select image</Button>

                    {selectedFiles && <FileSelection files={selectedFiles} />}
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

        dish.imageRefs = await uploadFiles(selectedFiles, `images/${currentUser!.uid}`)

        addDish(dish, currentUser!)

        history.push("/dishes")
    };
    return <>
        <FormWrapper title="New Dish">
            <DishForm onSubmit={saveDish}/>
        </FormWrapper>
    </>;
}