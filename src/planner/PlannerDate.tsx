import {Card, createStyles, makeStyles} from "@material-ui/core";
import moment, {Moment} from "moment";

interface Props {
    day: Moment
}

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
    }
}))

export function PlannerDate({ day } : Props) {
    const classes = useStyles()

    const isToday= day.isSame(moment(), 'day')

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

            <div>
                {day.isSame(moment()) ? "today" : ""}
            </div>
        </Card>
    </>;
}