import React, {useEffect, useState} from "react";
import {Box} from "@material-ui/core";
import {PlannerDate} from "./PlannerDate";
import {Moment} from "moment";
import {Week} from "./Week";
import {AppScreen} from "../AppScreen";
import {usePlannerDb} from "./PlannerDb";
import {Planning} from "./Planning";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {WeekControl} from "./WeekControl";

export function Planner() {
    const [visibleWeek, setVisibleWeek] = useState(Week.currentWeek())

    const [visibleDates, setVisibleDates] = useState<Moment[]>([])

    useEffect(() => setVisibleDates(visibleWeek.getDates()), [visibleWeek])

    const db = usePlannerDb()

    const queryClient = useQueryClient()

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
            <WeekControl week={visibleWeek} updateWeek={setVisibleWeek}/>

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

            <WeekControl week={visibleWeek} updateWeek={setVisibleWeek}/>
        </AppScreen>

    </>
}