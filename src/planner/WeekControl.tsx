import {Week} from "./Week";
import {Box, Button, ButtonGroup} from "@material-ui/core";
import {SkipNext, SkipPrevious, Today} from "@material-ui/icons";
import React from "react";

export function WeekControl({week, updateWeek}: { week: Week, updateWeek: ((week: Week) => void) }) {

    function setToday() {
        updateWeek(Week.currentWeek())
    }

    function shiftWeek(delta: number) {
        updateWeek(week.add(delta))
    }

    return <Box display="flex" justifyContent="center">
        <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => shiftWeek(-1)}>
                <SkipPrevious/>
                Prev week
            </Button>

            <Button onClick={() => setToday()}>
                <Today/>
                Today
            </Button>

            <Button onClick={() => shiftWeek(1)}>
                Next week
                <SkipNext/>
            </Button>
        </ButtonGroup>

    </Box>;
}