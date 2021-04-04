import {useHistory, useParams} from "react-router-dom";
import {DATE_FORMAT, usePlannerDb} from "./PlannerDb";
import moment from "moment";
import {AppScreen} from "../AppScreen";
import {DishList} from "../dishes/DishList";
import {Dish} from "../dishes/Dish";

export default function PlanDish() {
    const { date:dateParam } = useParams<{date: string}>();
    const date = moment(dateParam, DATE_FORMAT)

    const plannerDb = usePlannerDb()

    const history = useHistory()

    function planDish(dish:Dish) {
        plannerDb.add(date.toDate(), dish).then(() => {
            history.push("/") // todo: correct week
        })
    }

    return <>
        <AppScreen title={date.format("dddd D MMMM")}>
            <DishList onClick={planDish} />
        </AppScreen>
    </>
}