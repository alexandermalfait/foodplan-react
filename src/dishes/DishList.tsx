import {useHistory} from "react-router-dom";
import {Dish} from "./Dish";
import {CircularProgress, Container, createStyles, Fab, Grid, makeStyles} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import React, {useState} from "react";
import {DishCard} from "./DishCard";
import {Alert} from "@material-ui/lab";
import {TagSelector} from "../tags/TagSelector";
import {Tag} from "../tags/Tag";
import {useDishDb} from "./DishDb";
import {useQuery} from "react-query";

const useStyles = makeStyles(createStyles({
    fab: {
        position: "fixed",
        bottom: "20px",
        right: "50px"
    },

    tagSelector: {
        textAlign: "center",
        marginBottom: "1em",
    } ,

    dishCard: {
        height: "100%",
    }
}))

export function DishList({ onClick } : { onClick: (dish:Dish) => void}) {
    const history = useHistory()

    const classes = useStyles()

    const [ filteredTags, setFilteredTags ] = useState<Array<Tag>>([])

    const db = useDishDb()

    function createDish() {
        history.push(`/dishes/new`);
    }

    const { isLoading, data:dishes } = useQuery('dishes', () => db.list())

    if (isLoading) {
        return <CircularProgress />
    }

    const visibleDishes = dishes!.filter(dish =>
        !filteredTags || filteredTags.every(filteredTag => dish.tags.some(dishTag => dishTag.id === filteredTag.id))
    )

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
                        <DishCard dish={dish} onClick={() => onClick(dish)} className={classes.dishCard} />
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

