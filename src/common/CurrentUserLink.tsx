import firebase from "firebase";
import {signInAsUser, signOut} from "../services/Firebase";
import React from "react";
import {Avatar, Menu, MenuItem} from "@material-ui/core";

export const CurrentUserLink = ({user, className}: { user: firebase.User, className: string }) => {
    async function doSignOut() {
        await signOut();
    }

    async function doLoginAsEmail(email: string) {
        const loggedIn = await signInAsUser(email);

        if (loggedIn) {
            localStorage.setItem("lastImpersonatedEmail", email)
        } else {
            alert("Login failed!")
        }

        setAnchorEl(null);
    }

    const doLoginAsOtherUser = async () => {
        const email = prompt("Target login?")

        if (! email) {
            return
        }

        await doLoginAsEmail(email);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const lastImpersonatedEmail = localStorage.getItem("lastImpersonatedEmail")

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

            <MenuItem onClick={doLoginAsOtherUser}>Impersonate...</MenuItem>

            {lastImpersonatedEmail &&
                <MenuItem
                    onClick={() => doLoginAsEmail(lastImpersonatedEmail)}
                >Impersonate {lastImpersonatedEmail}</MenuItem>
            }
        </Menu>
    </>
}