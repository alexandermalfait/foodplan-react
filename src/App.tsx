import React from 'react';
import './App.scss';
import {Planner} from "./planner/Planner";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dishes from "./dishes/Dishes";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./services/Auth";
import Login from "./login/Login";

const queryClient = new QueryClient()

function App() {
    return <>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Planner}/>

                        <Route path="/dishes" component={Dishes}/>

                        <Route path="/login" component={Login}/>
                    </Switch>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    </>;
}

export default App;
