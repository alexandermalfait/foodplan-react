import React from 'react';
import './App.scss';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Planner} from "./planner/Planner";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {CalendarToday, MenuBook} from "@material-ui/icons";


function App() {
    return <>
        <BrowserRouter>
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <Typography variant="h6">
                        And the dinner is...
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

            <Container maxWidth="sm">
                <Switch>
                    <Route exact path="/" component={Planner} />

                    <Route path="/dishes">
                        <h1>Dishes</h1>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>


    </>;
}

export default App;
