import React, {useEffect, useState} from "react";
import {Box, Button, ButtonGroup} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import moment, {Moment} from "moment";
import {SkipNext, SkipPrevious, Today} from "@material-ui/icons";
import {Week} from "./Week";
import {AppScreen} from "../AppScreen";
import {usePlannerDb} from "./PlannerDb";
import {Planning} from "./Planning";
import {useMutation, useQuery, useQueryClient} from "react-query";

function thisMonday() {
    return moment().startOf('isoWeek');
}

function WeekControls(props: { onPreviousWeek: () => void, onToday: () => void, onNextWeek: () => void }) {
    return <Box display="flex" justifyContent="center">
        <ButtonGroup variant="contained">
            <Button onClick={props.onPreviousWeek}>
                <SkipPrevious/>
                Prev week
            </Button>

            <Button onClick={props.onToday}>
                <Today/>
                Today
            </Button>

            <Button onClick={props.onNextWeek}>
                Next week
                <SkipNext/>
            </Button>
        </ButtonGroup>

    </Box>;
}

export function Planner() {
    const [currentMonday, setCurrentMonday] = useState(thisMonday())

    const [visibleDates, setVisibleDates] = useState<Moment[]>([])

    const db = usePlannerDb()

    const queryClient = useQueryClient()

    function setToday() {
        setCurrentMonday(moment().startOf('isoWeek'))
    }

    function shiftWeek(delta: number) {
        setCurrentMonday(currentMonday.clone().add(delta, 'week'));
    }

    useEffect(() => {
        setVisibleDates(new Week(currentMonday).getDates())
    }, [currentMonday])

    const queryKey = ["plannings", ...visibleDates.map(d => d.toDate().getTime())]

    const deletePlanningMutation = useMutation(
        db.delete.bind(db), {
            onSuccess: () => queryClient.invalidateQueries(queryKey)
        }
    )

    function deletePlanning(planning: Planning) {
        if (window.confirm(`Remove '${planning.dish.name}'?`)) {
            deletePlanningMutation.mutate(planning)
        }
    }

    const {data: plannings} = useQuery<Planning[]>(queryKey, () => {
        if (!visibleDates.length) {
            return []
        }

        const firstDate = visibleDates[0];
        const lastDate = visibleDates[visibleDates.length - 1]

        return db.list(firstDate.toDate(), lastDate.toDate())
    }, {staleTime: 60 * 1000})

    return <>
        <AppScreen>
            <WeekControls onPreviousWeek={() => shiftWeek(-1)} onToday={setToday} onNextWeek={() => shiftWeek(1)}/>

            <Box py={1}>
                {visibleDates.map(day => {
                    const planningsForDate = plannings ? plannings.filter(p => day.isSame(p.date, "day")) : []

                    return <PlannerDate
                        key={day.toString()}
                        day={day}
                        plannings={planningsForDate}
                        deletePlanning={deletePlanning}
                    />;
                })}
            </Box>

            <WeekControls onPreviousWeek={() => shiftWeek(-1)} onToday={setToday} onNextWeek={() => shiftWeek(1)}/>
        </AppScreen>

    </>
}