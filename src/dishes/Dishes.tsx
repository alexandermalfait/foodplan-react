import {AppScreen} from "../AppScreen";
import {useState} from "react";
import {Card, CardHeader, CardMedia, Grid} from "@material-ui/core";


export default function Dishes() {
    const range = (n: number) => Array.from({length: n}, (value, key) => key)

    const [ dishes, setDishes] = useState(
        range(50).map(index => ( {name: `Dish ${index}`} ))
    )
    return <>
        <AppScreen title={"Dishes"}>
            <Grid container spacing={3}>
                {dishes.map(dish =>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card key={dish.name}>
                            <CardHeader title={dish.name}/>

                            <CardMedia  />
                        </Card>
                    </Grid>
                )}
            </Grid>
        </AppScreen>
    </>
}