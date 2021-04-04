import {Card, createStyles, Divider, IconButton, makeStyles} from "@material-ui/core";
import moment, {Moment} from "moment";
import {HighlightOff, MenuBook} from "@material-ui/icons";
import React from "react";
import {useHistory} from "react-router-dom";
import {DATE_FORMAT} from "./PlannerDb";
import {Planning} from "./Planning";
import {DishCard} from "../dishes/DishCard";

const useStyles = makeStyles(createStyles({
    root: {
        display: "flex",
        minHeight: "50px",
        margin: "1em 0"
    } ,

    date: {
        padding: ".5em",
        width: "15%",
        background: "#d5eff6",
        textAlign: "center",
    } ,

    dayOfWeek: {
        fontWeight: "bold",
    },

    fullDate: {
        fontSize: ".7em"
    } ,

    dateContents: {
        display: "flex",
        width: "85%"
    },

    planning: {
        flexGrow: 1
    },

    dishCard: {
        margin: ".5em",
        boxShadow: "none",
    },

    deleteIcon: {
        verticalAlign: "baseline",
        fontSize: ".8em",
        marginLeft: ".3em",
        color: "silver",
    },

    buttons: {}
}))

interface Props {
    day: Moment;
    plannings: Planning[];
    deletePlanning: (planning: Planning) => void;
}

export function PlannerDate({ day, plannings, deletePlanning } : Props) {
    const classes = useStyles()

    const history = useHistory()

    const isToday= day.isSame(moment(), 'day')

    function selectDish() {
        history.push(`/planner/${day.format(DATE_FORMAT)}/select`)
    }

    return <>
        <Card className={classes.root} raised={isToday}>
            <div className={classes.date}>
                <div className={classes.dayOfWeek}>
                    {day.format("ddd")}
                </div>
                <div className={classes.fullDate}>
                    {day.format("D MMM")}
                </div>
            </div>

            <div className={classes.dateContents}>
                <div className={classes.planning}>
                    {plannings.map((planning, index) => <>
                        {index > 0 && <Divider />}

                        <DishCard
                            dish={planning.dish}
                            className={classes.dishCard}
                            onClick={() => deletePlanning(planning)}
                            titleControls={
                                <HighlightOff className={classes.deleteIcon} />
                            }
                        />
                    </>
                    )}
                </div>

                <div className={classes.buttons}>
                    <IconButton onClick={() => selectDish()}>
                        <MenuBook/>
                    </IconButton>
                </div>
            </div>
        </Card>
    </>;
}