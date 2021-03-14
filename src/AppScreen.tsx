import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CalendarToday, MenuBook} from "@material-ui/icons";
import React from "react";


interface Props {
    title?: string
}

export const AppScreen:React.FC<Props> = (props) => {

    return <>
        <AppBar position="static" className="app-bar">
            <Toolbar>
                <Typography variant="h6">
                    {props.title ?? "And the dinner is..."}
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
            </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{margin: "2em auto"}}>
            <>{props.children}</>
        </Container>
    </>
}