import {AppScreen} from "../AppScreen";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {DishList} from "./DishList";


export default function Dishes() {
    const { path } = useRouteMatch();

    return <>
        <AppScreen title={"Dishes"}>
            <Switch>
                <Route exact path={path}>
                    <DishList />
                </Route>

                <Route exact path={`${path}/new`}>
                    <h1>New dish</h1>
                </Route>
            </Switch>
        </AppScreen>
    </>
}

