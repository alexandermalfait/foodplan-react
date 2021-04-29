import {useHistory} from "react-router-dom";
import {Dish} from "./Dish";
import {
    CircularProgress,
    Container,
    createStyles,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField
} from "@material-ui/core";
import {Add, Clear, SearchOutlined} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {DishCard} from "./DishCard";
import {Alert} from "@material-ui/lab";
import {TagSelector} from "../tags/TagSelector";
import {Tag} from "../tags/Tag";
import {useDishDb} from "./DishDb";
import {useQuery} from "react-query";
import {orderBy} from "natural-orderby";

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

    textSearch: {
        textAlign: "center",
        marginBottom: "1em",
    } ,

    dishCard: {
        height: "100%",
    }
}))

let lastFilteredTags = Array<Tag>()

export function DishList({ onClick } : { onClick: (dish:Dish) => void}) {
    const history = useHistory()

    const classes = useStyles()

    const [ filteredTags, setFilteredTags ] = useState(lastFilteredTags)

    const [ filteredText, setFilteredText ] = useState("")

    useEffect(() => { lastFilteredTags = filteredTags }, [ filteredTags])

    const db = useDishDb()

    function createDish() {
        history.push(`/dishes/new`);
    }

    const { isLoading, data:dishes } = useQuery('dishes', () => db.list())

    if (isLoading) {
        return <CircularProgress />
    }

    function dishMatchesFilters(dish: Dish) {
        if (filteredTags) {
            if (!filteredTags.every(filteredTag => dish.tags.some(dishTag => dishTag.id === filteredTag.id))) {
                return false
            }
        }

        if (filteredText) {
            if(!dish.name.toLowerCase().includes(filteredText.toLowerCase())) {
                return false
            }
        }

        return true;
    }

    const filteredDishes = dishes!.filter(dishMatchesFilters);
    const visibleDishes = orderBy(filteredDishes, [ d => d.name ])

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

        <Container className={classes.textSearch}>
            <TextField
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start"><SearchOutlined /></InputAdornment>,
                    endAdornment: filteredText &&
                        <InputAdornment position={"end"}>
                            <IconButton onClick={() => setFilteredText("")} size="small">
                                <Clear />
                            </IconButton>
                        </InputAdornment>
                }}
                value={filteredText}
                onChange={e => setFilteredText(e.currentTarget.value)}
                placeholder={"Search.."}
            />
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

