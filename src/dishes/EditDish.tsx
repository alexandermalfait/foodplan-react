import {useHistory, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Dish} from "./Dish";
import {CircularProgress} from "@material-ui/core";
import {DishForm, DishFormValue} from "./DishForm";
import {FormWrapper} from "../common/FormWrapper";
import {uploadFiles} from "../services/Firebase";
import {AuthContext} from "../services/Auth";
import {useDishDb} from "./DishDb";
import {useMutation} from "react-query";

export function EditDish() {
    const { dishId } = useParams<{dishId: string}>()

    const [ dish, setDish ] = useState<Dish|null>(null)

    const db = useDishDb()

    const currentUser = useContext(AuthContext);

    const history = useHistory()

    const saveDishMutation = useMutation("dishes", async (dishValue: DishFormValue) => {
        const dishToUpdate = dish!;

        dishToUpdate.name = dishValue.name
        dishToUpdate.url = dishValue.url
        dishToUpdate.tags = dishValue.tags
        dishToUpdate.notes = dishValue.notes

        if (dishValue.selectedFiles) {
            dishToUpdate.imageRefs = await uploadFiles(dishValue.selectedFiles, `images/${currentUser!.uid}/${Date.now()}`);
        }

        db.update(dishToUpdate).then(() => history.push("/dishes"))
    })

    const onDeleteDish = () => {
        if (! window.confirm("Sure you want to delete this thing?")) {
            return
        }

        db.delete(dish!).then(() => history.push("/dishes"))
    };

    useEffect(() => {
        db.fetchDishById(dishId).then(setDish)
    }, [dishId, db])

    if (!dish) {
        return <CircularProgress />
    }

    return <>
        <FormWrapper title={"Edit dish"}>
            <DishForm
                onSubmit={d => saveDishMutation.mutate(d)}
                currentValue={{...dish, selectedFiles:undefined}}
                onDeleteDish={onDeleteDish}
                isSaving={saveDishMutation.isLoading}
            />
        </FormWrapper>
    </>
}