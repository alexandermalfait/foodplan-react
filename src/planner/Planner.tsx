import React, {FC, useState} from "react";
import {Box, Button} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import moment from "moment";
import {SkipNext, SkipPrevious, Today} from "@material-ui/icons";

export const Planner: FC = () => {
    const [currentMonday, setCurrentMonday] = useState(moment().day(1))

    function getWeek() {
        const weekDays = []

        let day = currentMonday.clone()
        let sunday = currentMonday.clone().day(7)

        while(day <= sunday) {
            weekDays.push(day.clone())
            day = day.add(1, "day")
        }

        return weekDays;
    }

    function setToday() {
        setCurrentMonday(moment().day(1))
    }

    function shiftWeek(delta: number) {
        setCurrentMonday(currentMonday.clone().add(delta, 'week'));
    }

    return <>
        <Box py={3}>
            {getWeek().map(day => <PlannerDate day={day}/>)}
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