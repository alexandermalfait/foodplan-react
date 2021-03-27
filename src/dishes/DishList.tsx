import {useHistory, useRouteMatch} from "react-router-dom";
import {Dish} from "./Dish";
import {Card, CardHeader, CardMedia, CircularProgress, Fab, Grid} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {snapshotDishes} from "../services/Db";
import {useEffect, useState} from "react";

export function DishList() {
    const history = useHistory()
    const {path} = useRouteMatch();

    const [ dishes, setDishes ] = useState<Array<Dish>|null>(null)

    useEffect(() => snapshotDishes(setDishes), [])

    if (dishes == null) {
        return <CircularProgress />
    }

    return <>
        <Fab
            color="primary"
            style={{position: "fixed", bottom: "20px", right: "50px"}}
            onClick={() => history.push(`${path}/new`)}
        >
            <Add/>
        </Fab>

        <Grid container spacing={3}>
            {dishes.map(dish =>
                <Grid item xs={12} md={6} lg={4} key={dish.id}>
                    {DishCard(dish)}
                </Grid>
            )}
        </Grid>
    </>;
}

function DishCard(dish: Dish) {
    return <Card style={{display: "flex"}}>
        <CardHeader title={dish.name} style={{width: "70%"}}/>

        {dish.imageUrl && <CardMedia image={dish.imageUrl} style={{width: "30%"}}/>}
    </Card>;
}