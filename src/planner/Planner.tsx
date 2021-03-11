import React, {FC, useState} from "react";
import {Box, Button} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import moment from "moment";

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

    function shiftWeek(delta: number) {
        setCurrentMonday(currentMonday.clone().add(delta, 'week'));
    }

    return <>
        <Box p={3}>
            {getWeek().map(day => <PlannerDate day={day}/>)}
        </Box>

        <Button onClick={() => shiftWeek(-1)}>
            Prev week
        </Button>

        <Button onClick={() => shiftWeek(1)}>
            Next week
        </Button>
    </>
}