import React, {FC, useState} from "react";
import {Box, Button} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import moment, {Moment} from "moment";
import {SkipNext, SkipPrevious, Today} from "@material-ui/icons";
import {Week} from "./Week";

export const Planner: FC = () => {
    const [currentMonday, setCurrentMonday] = useState(moment().day(1))

    function getWeekDates(): Moment[] {
        return new Week(currentMonday).getDates()
    }

    function setToday() {
        setCurrentMonday(moment().day(1))
    }

    function shiftWeek(delta: number) {
        setCurrentMonday(currentMonday.clone().add(delta, 'week'));
    }

    return <>
        <Box py={3}>
            {getWeekDates().map(day => <PlannerDate day={day} key={day.toString()}/>)}
        </Box>

        <Box display="flex" justifyContent="space-between">
            <Button onClick={() => shiftWeek(-1)} variant="contained">
                <SkipPrevious />
                Prev week
            </Button>

            <Button onClick={() => setToday()} variant="contained">
                <Today />
                Today
            </Button>

            <Button onClick={() => shiftWeek(1)} variant="contained" >
                Next week
                <SkipNext />
            </Button>
        </Box>


    </>
}