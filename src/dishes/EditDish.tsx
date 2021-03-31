import {useHistory, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Dish} from "./Dish";
import {CircularProgress} from "@material-ui/core";
import {DishForm, DishFormValue} from "./DishForm";
import {fetchDishById, updateDish} from "../services/Db";
import {FormWrapper} from "../common/FormWrapper";
import {uploadFiles} from "../services/Firebase";
import {AuthContext} from "../services/Auth";

export function EditDish() {
    const { dishId } = useParams<{dishId: string}>()

    const [ dish, setDish ] = useState<Dish|null>(null)

    const currentUser = useContext(AuthContext);

    const history = useHistory()

    const saveDish = async (dishValue: DishFormValue) => {
        const dishToUpdate = dish!;

        dishToUpdate.name = dishValue.name
        dishToUpdate.url = dishValue.url

        if (dishValue.selectedFiles) {
            dishToUpdate.imageRefs = await uploadFiles(dishValue.selectedFiles, `images/${currentUser!.uid}`);
        }

        updateDish(dishToUpdate, currentUser!)

        history.push("/dishes")
    };

    useEffect(() => {
        fetchDishById(currentUser!, dishId).then(setDish)
    }, [dishId, currentUser])

    if (!dish) {
        return <CircularProgress />
    }

    return <>
        <FormWrapper title={"Edit dish"}>
            <DishForm onSubmit={saveDish} currentValue={{...dish, selectedFiles:undefined}} />
        </FormWrapper>
    </>
}