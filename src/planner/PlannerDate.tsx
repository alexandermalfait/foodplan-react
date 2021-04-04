import {Card, createStyles, IconButton, makeStyles} from "@material-ui/core";
import moment, {Moment} from "moment";
import {MenuBook} from "@material-ui/icons";
import React from "react";
import {useHistory} from "react-router-dom";
import {DATE_FORMAT} from "./PlannerDb";

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

    buttons: {}
}))

export function PlannerDate({ day } : { day: Moment }) {
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
                <div className={classes.planning}/>

                <div className={classes.buttons}>
                    <IconButton onClick={() => selectDish()}>
                        <MenuBook/>
                    </IconButton>
                </div>
            </div>
        </Card>
    </>;
}