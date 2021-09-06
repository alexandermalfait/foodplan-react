import {AppBar, Container, createStyles, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CalendarToday, MenuBook} from "@material-ui/icons";
import React, {useContext} from "react";
import {AuthContext} from "./services/Auth";
import {TagIcon} from "./tags/TagIcon";
import {CurrentUserLink} from "./common/CurrentUserLink";

const useStyles = makeStyles(theme => createStyles({
    root: {
        "& svg": {
            fill: "white"
        }
    },

    toolbar: {
        display: "flex",
    },

    title: {
        fontSize: "24px",
        "flexGrow": 1,
        textAlign: "left",
        [ theme.breakpoints.down("xs")]: {
            fontSize: "18px"
        }
    },

    currentUserLink: {
        marginLeft: ".5em",
        cursor: "pointer",
    }
}))

export const AppScreen = ({title, children} : { title?: string, children: React.ReactNode }) => {
    const currentUser = useContext(AuthContext);
    const classes = useStyles()

    return <>
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                    <Typography variant="h1" className={classes.title}>
                    {title ?? "And the dinner is..."}
                </Typography>

                {currentUser && <>
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

                    <CurrentUserLink user={currentUser} className={classes.currentUserLink} />
                </>}


            </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{margin: "2em auto"}}>
            <>{children}</>
        </Container>
    </>
}