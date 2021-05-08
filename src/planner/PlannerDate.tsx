import {createStyles, IconButton, makeStyles} from "@material-ui/core";
import moment, {Moment} from "moment";
import {HighlightOff, MenuBook} from "@material-ui/icons";
import React from "react";
import {useHistory} from "react-router-dom";
import {DATE_FORMAT} from "./PlannerDb";
import {Planning} from "./Planning";
import {DishCard} from "../dishes/DishCard";
import {PlanningNotificationControl} from "./PlanningNotificationControl";

const useStyles = makeStyles(createStyles({
    root: {
        //display: "flex",
        minHeight: "50px",
        margin: ".5em 0",
        padding: ".5em",
        borderBottom: "1px dotted silver",

        "&:last-child": {
            borderBottom: "none",
        }
    } ,

    today: {
        background: "#fafff7",
    } ,

    top: {
        display: "flex"
    } ,

    dateIcon: {
        display: "inline-block",
    } ,
    date: {
        marginRight: "auto",
        color: "#310f57",

        "& > h2, & > h3": {
            display: "inline-block",
            marginLeft: ".5em",
            margin: "0",
            fontFamily: "'Poppins', Roboto",
        },
    } ,

    todayDate: {
        borderBottom: "1px dashed green",
    },

    dayOfWeek: {
        fontWeight: "bold",
        fontSize: "1.3rem"
    },

    fullDate: {
       fontSize: ".9rem",
        fontWeight: "normal",
    } ,

    dateContents: {
        display: "flex",
    },

    planning: {
        flexGrow: 1
    },

    dishCard: {
        margin: ".5em",
        background: "linear-gradient(90deg, rgba(255,255,250,1) 0%, rgba(255,255,255,1) 100%);",
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
        <div className={`${classes.root} ${isToday ? classes.today : ""}`}>
            <div className={classes.top}>
                <div className={`${classes.date}`}>
                    <h2 className={`${classes.dayOfWeek} ${isToday ? classes.todayDate : ""}`}>
                        {day.format("dddd")}
                    </h2>
                    <h3 className={classes.fullDate}>
                        {day.format("D MMMM")}
                    </h3>
                </div>

                <div className={classes.buttons}>
                    <IconButton onClick={() => selectDish()} size={"small"}>
                        <MenuBook/>
                    </IconButton>
                </div>
            </div>

            <div className={classes.dateContents}>
                <div className={classes.planning}>
                    {plannings.map((planning) => <React.Fragment key={planning.id}>
                        <DishCard
                            dish={planning.dish}
                            className={classes.dishCard}
                            onClick={() => deletePlanning(planning)}
                            titleControls={
                                <HighlightOff className={classes.deleteIcon} />
                            }
                            extraControls={
                                <PlanningNotificationControl planning={planning} />
                            }
                        />
                    </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    </>;
}