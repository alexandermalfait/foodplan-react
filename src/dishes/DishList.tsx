import {useHistory} from "react-router-dom";
import {Dish} from "./Dish";
import {CircularProgress, createStyles, Fab, Grid, makeStyles} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import React, {useState} from "react";
import {DishCard} from "./DishCard";
import {Alert} from "@material-ui/lab";
import {useDishDb} from "./DishDb";
import {useQuery} from "react-query";
import {orderBy} from "natural-orderby";
import {DishListFilter, DishListFilterState} from "./DishListFilter";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(createStyles({
    fab: {
        position: "fixed",
        bottom: "20px",
        right: "50px"
    },

    dishCard: {
        height: "100%",
    }
}))


const SCROLLED_DISHES_BATCH_COUNT = 20;

export function DishList({ onClick } : { onClick: (dish:Dish) => void}) {
    const history = useHistory()

    const classes = useStyles()

    const db = useDishDb()

    const [ filterState, setFilterState ] = useState<DishListFilterState>(new DishListFilterState())

    const [ scrolledDishesCount, setScrolledDishesCount ] = useState(SCROLLED_DISHES_BATCH_COUNT)

    function createDish() {
        history.push(`/dishes/new`);
    }

    const { isLoading, data:dishes } = useQuery('dishes', () => db.list())

    if (isLoading) {
        return <CircularProgress />
    }

    const filteredDishes = dishes!.filter(d => filterState.matches(d));
    const visibleDishes = orderBy(filteredDishes, [ d => d.name ])
    const scrolledDishes = visibleDishes.slice(0, scrolledDishesCount)

    function loadNextBatch() {
        setScrolledDishesCount(scrolledDishesCount + SCROLLED_DISHES_BATCH_COUNT);
    }

    return <>
        <Fab
            color="primary"
            className={classes.fab}
            onClick={() => createDish()}
        >
            <Add/>
        </Fab>

        <DishListFilter filtersUpdated={setFilterState} />

        {!visibleDishes.length &&
            <Alert severity="info" style={{width: "100%"}}>
                {filterState.filled ? "No food found for this search" : "Add some food to get started!" }
            </Alert>
        }

        {visibleDishes.length &&
            <InfiniteScroll
                next={() => loadNextBatch()}
                hasMore={scrolledDishesCount < visibleDishes.length}
                loader={"..."}
                dataLength={scrolledDishes.length}
            >
                <Grid container spacing={3}>
                    {scrolledDishes.map(dish =>
                        <Grid item xs={12} md={6} lg={4} key={dish.id}>
                            <DishCard dish={dish} onClick={() => onClick(dish)} className={classes.dishCard}/>
                        </Grid>
                    )}
                </Grid>
            </InfiniteScroll>
        }
    </>;
}

