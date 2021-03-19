import {AppScreen} from "../AppScreen";
import {useState} from "react";
import {Card, CardHeader, CardMedia, Grid} from "@material-ui/core";

function DishCard(dish: Dish) {
    return <Card key={dish.name} style={{display: "flex"}}>
        <CardHeader title={dish.name} style={{width: "70%" }}/>

        <CardMedia image={dish.imageUrl} style={{width: "30%"}}/>
    </Card>;
}

interface Dish {
    name: string,
    imageUrl: string
}

export default function Dishes() {
    const range = (n: number) => Array.from({length: n}, (value, key) => key)

    const [ dishes, setDishes] = useState<Array<Dish>>(
        range(50).map(index => ( {
            name: `Dish ${index} ${index % 3 === 0 ? "Some very long name blah blah blah lorem ipsum something or other blah" : ""}`,
            imageUrl: "https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg"
        } ))
    )
    return <>
        <AppScreen title={"Dishes"}>
            <Grid container spacing={3}>
                {dishes.map(dish =>
                    <Grid item xs={12} md={6} lg={4}>
                        {DishCard(dish)}
                    </Grid>
                )}
            </Grid>
        </AppScreen>
    </>
}