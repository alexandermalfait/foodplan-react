import {useParams} from "react-router-dom";
import {DATE_FORMAT} from "./PlannerDb";
import moment from "moment";
import {AppScreen} from "../AppScreen";
import {DishList} from "../dishes/DishList";

export default function PlanDish() {
    const { date:dateParam } = useParams<{date: string}>();

    const date = moment(dateParam, DATE_FORMAT)

    return <>
        <AppScreen title={date.format("dddd D MMMM")}>
            <DishList />
        </AppScreen>
    </>
}