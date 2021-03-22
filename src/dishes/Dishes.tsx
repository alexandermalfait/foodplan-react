import {AppScreen} from "../AppScreen";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {DishList} from "./DishList";
import {NewDish} from "./NewDish";


export default function Dishes() {
    const { path } = useRouteMatch();

    return <>
        <AppScreen title={"Dishes"}>
            <Switch>
                <Route exact path={path}>
                    <DishList />
                </Route>

                <Route exact path={`${path}/new`}>
                    <NewDish />
                </Route>
            </Switch>
        </AppScreen>
    </>
}

