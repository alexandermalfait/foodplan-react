import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {FormWrapper} from "../common/FormWrapper";
import {AuthContext} from "../services/Auth";
import {uploadFiles} from "../services/Firebase";
import {DishForm, DishFormValue} from "./DishForm";
import {useDishDb} from "./DishDb";
import {useMutation} from "react-query";


export function NewDish() {
    const currentUser = useContext(AuthContext);

    const history = useHistory()

    const db = useDishDb()

    const saveDishMutation = useMutation("dishes",async (dishValue: DishFormValue) => {
        const {selectedFiles, ...dish} = dishValue

        if (selectedFiles) {
            dish.imageRefs = await uploadFiles(selectedFiles, `images/${currentUser!.uid}`);
        }

        db.add(dish).then(() => history.push("/dishes"))
    })

    return <>
        <FormWrapper title="New Dish">
            <DishForm onSubmit={d => saveDishMutation.mutate(d)} isSaving={saveDishMutation.isLoading}/>
        </FormWrapper>
    </>;
}