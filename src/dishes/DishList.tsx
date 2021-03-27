import {useHistory, useRouteMatch} from "react-router-dom";
import {Dish} from "./Dish";
import {Card, CardHeader, CardMedia, Fab, Grid} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {fetchDishes} from "../services/Firestore";
import {useQuery} from "react-query";
import {QueryStatus} from "../common/QueryStatus";

export function DishList() {
    const history = useHistory()
    const {path} = useRouteMatch();

    const query = useQuery("fishes", fetchDishes)

    if (query.isLoading || query.isError) {
        return <QueryStatus query={query}/>
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
            {(query.data)!.map(dish => {
                return <Grid item xs={12} md={6} lg={4} key={dish.id}>
                    {DishCard(dish)}
                </Grid>
            })}
        </Grid>
    </>;
}

function DishCard(dish: Dish) {
    return <Card style={{display: "flex"}}>
        <CardHeader title={dish.name} style={{width: "70%"}}/>

        {dish.imageUrl && <CardMedia image={dish.imageUrl} style={{width: "30%"}}/>}
    </Card>;
}