import React from "react";

import {signInWithGoogle} from "../services/Firebase";
import {AppScreen} from "../AppScreen";
import {Box, Button, createStyles, makeStyles} from "@material-ui/core";
import {FormWrapper} from "../common/FormWrapper";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(createStyles({
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        "& img": {
            marginRight: "1em"
        }
    }
}))

export default function Login() {
    const classes = useStyles()

    const history = useHistory();

    const doSignInWithGoogle = () => {
        signInWithGoogle().then(() => history.push("/"))
    }

    return (
        <AppScreen>
            <FormWrapper title={"Login"}>
                <Box className={classes.buttons}>
                    <Button onClick={doSignInWithGoogle} variant="outlined">
                        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="Google"/>

                        Continue with google
                    </Button>
                </Box>
            </FormWrapper>
        </AppScreen>
    );
}
