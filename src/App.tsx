import React from 'react';
import './App.scss';
import {Planner} from "./planner/Planner";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dishes from "./dishes/Dishes";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {
    return <>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Planner}/>

                    <Route path="/dishes" component={Dishes}/>
                </Switch>
            </BrowserRouter>
        </QueryClientProvider>
    </>;
}

export default App;
