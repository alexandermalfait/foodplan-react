import {Card} from "@material-ui/core";
import moment, {Moment} from "moment";

require("./PlannerDate.scss")

interface Props {
    day: Moment
}

export function PlannerDate({ day } : Props) {
    function isToday() {
        return day.isSame(moment(), 'day');
    }

    return <>
        <Card className="planner-date" raised={isToday()}>
            <div className="date">
                <div className={"day-of-week"}>
                    {day.format("ddd")}
                </div>
                <div className={"full-date"}>
                    {day.format("D MMM")}
                </div>
            </div>

            <div>
                {day.isSame(moment()) ? "today" : ""}
            </div>
        </Card>
    </>;
}