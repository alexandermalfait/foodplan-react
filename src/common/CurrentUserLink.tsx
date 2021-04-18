import firebase from "firebase";
import {signInAsUser, signOut} from "../services/Firebase";
import React from "react";
import {Avatar, Menu, MenuItem} from "@material-ui/core";

export const CurrentUserLink = ({user, className}: { user: firebase.User, className: string }) => {
    function doSignOut() {
        signOut();
    }

    const doLoginAsX = async () => {
        const email = prompt("Target login?")

        if (! email) {
            return
        }

        const loggedIn = await signInAsUser(email);

        if (! loggedIn) {
            alert("Login failed!")
        }

        setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return <>
        <Avatar
            src={user.photoURL || undefined}
            alt={user.email || undefined}
            onClick={handleClick}
            className={className}
        />

        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{vertical: "top", horizontal: "center"}}
        >
            <MenuItem onClick={doSignOut}>Log Out</MenuItem>

            <MenuItem onClick={doLoginAsX}>Impersonate...</MenuItem>
        </Menu>
    </>
}