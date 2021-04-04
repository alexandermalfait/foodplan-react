import {AppBar, Container, Hidden, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CalendarToday, ExitToApp, MenuBook} from "@material-ui/icons";
import React, {useContext} from "react";
import {AuthContext} from "./services/Auth";
import firebase from "firebase";
import {signOut} from "./services/Firebase";
import {TagIcon} from "./tags/TagIcon";

const CurrentUserLink = ({user} : {user: firebase.User}) => {
    return <>
        <strong>{user.email}</strong>
    </>
}

export const AppScreen = ({title, children} : { title?: string, children: React.ReactNode }) => {
    const currentUser = useContext(AuthContext);

    function doSignOut() {
        if (window.confirm("Log out?")) {
            signOut();
        }
    }

    return <>
        <AppBar position="static" className="app-bar">
            <Toolbar className="toolbar">
                <Hidden smDown>
                    {currentUser ? <CurrentUserLink user={currentUser}/> : "(not logged in)"}
                </Hidden>

                <Typography variant="h1">
                    {title ?? "And the dinner is..."}
                </Typography>

                <Link to="/">
                    <IconButton edge="end">
                        <CalendarToday/>
                    </IconButton>
                </Link>

                <Link to="/dishes">
                    <IconButton edge="end">
                        <MenuBook/>
                    </IconButton>
                </Link>

                <Link to="/tags">
                    <IconButton edge="end">
                        <TagIcon />
                    </IconButton>
                </Link>

                {currentUser &&
                    <IconButton edge="end" onClick={doSignOut}>
                        <ExitToApp />
                    </IconButton>
                }

            </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{margin: "2em auto"}}>
            <>{children}</>
        </Container>
    </>
}