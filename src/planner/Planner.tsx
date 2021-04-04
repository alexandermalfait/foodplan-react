import React, {useEffect, useState} from "react";
import {Box, Button} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import moment, {Moment} from "moment";
import {SkipNext, SkipPrevious, Today} from "@material-ui/icons";
import {Week} from "./Week";
import {AppScreen} from "../AppScreen";

function thisMonday() {
    return moment().startOf('isoWeek');
}

export function Planner() {
    const [currentMonday, setCurrentMonday] = useState(thisMonday())

    function getWeekDates(): Moment[] {
        return new Week(currentMonday).getDates()
    }

    function setToday() {
        setCurrentMonday(moment().startOf('isoWeek'))
    }

    function shiftWeek(delta: number) {
        setCurrentMonday(currentMonday.clone().add(delta, 'week'));
    }

    function loadPlanning() {
    }

    useEffect(loadPlanning, [currentMonday])

    return <>
        <AppScreen>
            <Box py={1}>
                {getWeekDates().map(day => <PlannerDate day={day} key={day.toString()}/>)}
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Button onClick={() => shiftWeek(-1)} variant="contained">
                    <SkipPrevious />
                    Prev week
                </Button>

                <Button onClick={setToday} variant="contained" style={{background: "beige"}}>
                    <Today />
                    Today
                </Button>

                <Button onClick={() => shiftWeek(1)} variant="contained" >
                    Next week
                    <SkipNext />
                </Button>
            </Box>
        </AppScreen>

    </>
}