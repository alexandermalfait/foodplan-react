import {useHistory, useParams} from "react-router-dom";
import {DATE_FORMAT, usePlannerDb} from "./PlannerDb";
import moment from "moment";
import {AppScreen} from "../AppScreen";
import {DishList} from "../dishes/DishList";
import {Dish} from "../dishes/Dish";
import {useQueryClient} from "react-query";

export default function PlanDish() {
    const { date:dateParam } = useParams<{date: string}>();
    const date = moment(dateParam, DATE_FORMAT)

    const plannerDb = usePlannerDb()

    const history = useHistory()

    const queryClient = useQueryClient()

    async function planDish(dish:Dish) {
        await plannerDb.add(date.toDate(), dish)

        await queryClient.invalidateQueries("plannings")

        history.push(`/planner/${date.format(DATE_FORMAT)}`)
    }

    return <>
        <AppScreen title={date.format("dddd D MMMM")}>
            <DishList onClick={planDish} />
        </AppScreen>
    </>
}