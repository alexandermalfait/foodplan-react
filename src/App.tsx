import React from 'react';
import './App.scss';
import {Planner} from "./planner/Planner";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dishes from "./dishes/Dishes";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./services/Auth";
import Login from "./login/Login";
import PrivateRoute from "./login/PrivateRoute";
import {Tags} from "./tags/Tags";
import PlanDish from "./planner/PlanDish";

const queryClient = new QueryClient()

function App() {
    return <>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={Planner}/>

                        <PrivateRoute path="/planner/:date/select" component={PlanDish}/>

                        <PrivateRoute path="/dishes" component={Dishes}/>

                        <PrivateRoute path="/tags" component={Tags}/>

                        <Route path="/login" component={Login}/>
                    </Switch>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    </>;
}

export default App;
