import {AppScreen} from "../AppScreen";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import {DishList} from "./DishList";
import {NewDish} from "./NewDish";
import {EditDish} from "./EditDish";
import {Dish} from "./Dish";


export default function Dishes() {
    const { path } = useRouteMatch();

    const history = useHistory()

    function editDish(dish: Dish) {
        history.push(`${path}/edit/${dish.id}`);
    }

    return <>
        <AppScreen title={"Dishes"}>
            <Switch>
                <Route exact path={path}>
                    <DishList onClick={editDish}/>
                </Route>

                <Route path={`${path}/edit/:dishId`}>
                    <EditDish />
                </Route>

                <Route exact path={`${path}/new`}>
                    <NewDish />
                </Route>
            </Switch>
        </AppScreen>
    </>
}

