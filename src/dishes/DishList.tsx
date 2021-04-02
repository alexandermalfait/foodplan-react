import {useHistory, useRouteMatch} from "react-router-dom";
import {Dish} from "./Dish";
import {CircularProgress, Container, createStyles, Fab, Grid, makeStyles} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {snapshotDishes} from "./DishDb";
import React, {useContext, useEffect, useState} from "react";
import {DishCard} from "./DishCard";
import {AuthContext} from "../services/Auth";
import {Alert} from "@material-ui/lab";
import {TagSelector} from "../tags/TagSelector";
import {Tag} from "../tags/Tag";

const useStyles = makeStyles(createStyles({
    fab: {
        position: "fixed",
        bottom: "20px",
        right: "50px"
    },

    tagSelector: {
        textAlign: "center",
        marginBottom: "1em",
    }
}))

export function DishList() {
    const history = useHistory()
    const {path} = useRouteMatch();

    const classes = useStyles()

    const currentUser = useContext(AuthContext)

    const [ dishes, setDishes ] = useState<Array<Dish>|null>(null)

    const [ filteredTags, setFilteredTags ] = useState<Array<Tag>>([])

    function editDish(dish: Dish) {
        history.push(`${path}/edit/${dish.id}`);
    }

    function createDish() {
        history.push(`${path}/new`);
    }

    useEffect(() => snapshotDishes(currentUser!, setDishes), [currentUser])

    if (dishes == null) {
        return <CircularProgress />
    }

    const visibleDishes = dishes.filter(dish => !filteredTags || filteredTags.every(filteredTag => dish.tags.some(dishTag => dishTag.id === filteredTag.id)))

    return <>
        <Fab
            color="primary"
            className={classes.fab}
            onClick={() => createDish()}
        >
            <Add/>
        </Fab>

        <Container className={classes.tagSelector}>
            <TagSelector initialTags={filteredTags} onChange={setFilteredTags} />
        </Container>

        <Grid container spacing={3}>
            {visibleDishes.length ?
                visibleDishes.map(dish =>
                    <Grid item xs={12} md={6} lg={4} key={dish.id}>
                        <DishCard dish={dish} onClick={() => editDish(dish)} />
                    </Grid>
                )
                :
                <Alert severity="info" style={{width: "100%"}}>
                    {filteredTags ? "No food found for these tags" : "Add some food to get started!" }
                </Alert>
            }
        </Grid>
    </>;
}

