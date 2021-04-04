import React, {useEffect, useState} from "react";
import {Box, Button} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import moment, {Moment} from "moment";
import {SkipNext, SkipPrevious, Today} from "@material-ui/icons";
import {Week} from "./Week";
import {AppScreen} from "../AppScreen";
import {usePlannerDb} from "./PlannerDb";
import {Planning} from "./Planning";

function thisMonday() {
    return moment().startOf('isoWeek');
}

export function Planner() {
    const [currentMonday, setCurrentMonday] = useState(thisMonday())

    const [visibleDates, setVisibleDates] = useState<Moment[]>([])

    const [plannings, setPlannings] = useState<Planning[]>([])

    const db = usePlannerDb()

    function setToday() {
        setCurrentMonday(moment().startOf('isoWeek'))
    }

    function shiftWeek(delta: number) {
        setCurrentMonday(currentMonday.clone().add(delta, 'week'));
    }

    function deletePlanning(planning:Planning) {
        if(window.confirm(`Remove '${planning.dish.name}'?`)) {
            db.delete(planning).then(() => setVisibleDates([...visibleDates]))
        }
    }

    useEffect(() => {
        setVisibleDates(new Week(currentMonday).getDates())
    }, [ currentMonday ])

    useEffect(function () {
        if (!visibleDates.length) {
            return
        }

        const firstDate = visibleDates[0];
        const lastDate = visibleDates[visibleDates.length - 1]

        db.list(firstDate.toDate(), lastDate.toDate()).then(setPlannings)
    }, [visibleDates, db])

    return <>
        <AppScreen>
            <Box py={1}>
                {visibleDates.map(day => {
                    const planningsForDate = plannings.filter(p => day.isSame(p.date, "day"));

                    return <PlannerDate
                            key={day.toString()}
                            day={day}
                            plannings={planningsForDate}
                            deletePlanning={deletePlanning}
                        />;
                    }
                )}
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