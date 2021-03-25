import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CalendarToday, ExitToApp, MenuBook} from "@material-ui/icons";
import React, {useContext} from "react";
import {AuthContext} from "./services/Auth";
import firebase from "firebase";
import {signOut} from "./services/Firebase";

const CurrentUserLink = ({user} : {user: firebase.User}) => {
    return <>
        <strong>{user.email}</strong>
    </>
}

export const AppScreen = ({title, children} : { title?: string, children: React.ReactNode }) => {
    const currentUser = useContext(AuthContext);

    return <>
        <AppBar position="static" className="app-bar">
            <Toolbar className="toolbar">
                {currentUser ? <CurrentUserLink user={currentUser}/> : "(not logged in)"}

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

                {currentUser &&
                    <IconButton edge="end" onClick={signOut}>
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