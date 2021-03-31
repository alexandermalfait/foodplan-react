import {useHistory, useRouteMatch} from "react-router-dom";
import {Dish} from "./Dish";
import {CircularProgress, Fab, Grid} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {snapshotDishes} from "../services/Db";
import {useContext, useEffect, useState} from "react";
import {DishCard} from "./DishCard";
import {AuthContext} from "../services/Auth";
import {Alert} from "@material-ui/lab";

export function DishList() {
    const history = useHistory()
    const {path} = useRouteMatch();

    const currentUser = useContext(AuthContext)

    const [ dishes, setDishes ] = useState<Array<Dish>|null>(null)

    useEffect(() => snapshotDishes(currentUser!, setDishes), [currentUser])

    if (dishes == null) {
        return <CircularProgress />
    }

    function editDish(dish: Dish) {
        history.push(`${path}/edit/${dish.id}`);
    }

    function createDish() {
        history.push(`${path}/new`);
    }

    return <>
        <Fab
            color="primary"
            style={{position: "fixed", bottom: "20px", right: "50px"}}
            onClick={() => createDish()}
        >
            <Add/>
        </Fab>

        <Grid container spacing={3}>
            {dishes.length ?
                dishes.map(dish =>
                    <Grid item xs={12} md={6} lg={4} key={dish.id}>
                        <DishCard dish={dish} onClick={() => editDish(dish)} />
                    </Grid>
                )
                :
                <Alert severity="info" style={{width: "100%"}}>Add some food to get started!</Alert>
            }
        </Grid>
    </>;
}

