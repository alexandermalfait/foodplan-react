import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {FormWrapper} from "../common/FormWrapper";
import {AuthContext} from "../services/Auth";
import {addDish} from "./DishDb";
import {uploadFiles} from "../services/Firebase";
import {DishForm, DishFormValue} from "./DishForm";


export function NewDish() {
    const currentUser = useContext(AuthContext);

    const history = useHistory()

    const saveDish = async (dishValue: DishFormValue) => {
        const {selectedFiles, ...dish} = dishValue

        if (selectedFiles) {
            dish.imageRefs = await uploadFiles(selectedFiles, `images/${currentUser!.uid}`);
        }

        addDish(dish, currentUser!)

        history.push("/dishes")
    };
    return <>
        <FormWrapper title="New Dish">
            <DishForm onSubmit={saveDish}/>
        </FormWrapper>
    </>;
}