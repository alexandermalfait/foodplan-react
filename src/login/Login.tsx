import React, {useContext} from "react";

import {signInWithGoogle} from "../services/Firebase";
import {AppScreen} from "../AppScreen";
import {Box, Button, createStyles, makeStyles} from "@material-ui/core";
import {FormWrapper} from "../common/FormWrapper";
import {Redirect} from "react-router-dom";
import {AuthContext} from "../services/Auth";

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

    const currentUser = useContext(AuthContext)

    if (currentUser) {
        return <><Redirect to={"/"} /></>
    }

    return (
        <AppScreen>
            <FormWrapper title={"Login"}>
                <Box className={classes.buttons}>
                    <Button onClick={signInWithGoogle} variant="outlined">
                        <img src="https://img.icons8.com/cute-clipart/64/000000/google-logo.png" alt="Google"/>

                        Sign in with google
                    </Button>
                </Box>
            </FormWrapper>
        </AppScreen>
    );
}
