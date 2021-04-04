import {Dish} from "../dishes/Dish";

export interface Planning {
    id: string,

    date: Date,

    dish: Dish
}