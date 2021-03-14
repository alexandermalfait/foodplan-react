import React from 'react';
import './App.scss';
import {Planner} from "./planner/Planner";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dishes from "./dishes/Dishes";


function App() {
    return <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Planner}/>

                <Route path="/dishes" component={Dishes}/>
            </Switch>
        </BrowserRouter>
    </>;
}

export default App;
