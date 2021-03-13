import React from 'react';
import './App.scss';
import {Planner} from "./planner/Planner";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AppScreen} from "./AppScreen";


function App() {
    return <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Planner} />

                <Route path="/dishes">
                    <AppScreen>
                        <h1>Dishes</h1>
                    </AppScreen>
                </Route>
            </Switch>
        </BrowserRouter>
    </>;
}

export default App;
