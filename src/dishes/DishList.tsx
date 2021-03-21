import {useHistory, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {Dish} from "./Dish";
import {Card, CardHeader, CardMedia, Fab, Grid} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {fetchPhotos} from "../api";

export function DishList() {
    const history = useHistory()
    const {path} = useRouteMatch();

    const [dishes, setDishes] = useState<Array<Dish>>([])

    useEffect(() => {
        (async () => {
            const photos = await fetchPhotos()

            setDishes(photos.result!.slice(0, 50).map(photo => ({
                name: photo.title, imageUrl: photo.thumbnailUrl
            })))
        })()
    }, [ ])

    return <>
        <Fab color="primary" style={{position: "fixed", bottom: "20px", right: "50px"}}
             onClick={() => history.push(`${path}/new`)}>
            <Add/>
        </Fab>

        <Grid container spacing={3}>
            {dishes.map(dish =>
                <Grid item xs={12} md={6} lg={4} key={dish.name}>
                    {DishCard(dish)}
                </Grid>
            )}
        </Grid>
    </>;
}

function DishCard(dish: Dish) {
    return <Card style={{display: "flex"}}>
        <CardHeader title={dish.name} style={{width: "70%" }}/>

        <CardMedia image={dish.imageUrl} style={{width: "30%"}}/>
    </Card>;
}