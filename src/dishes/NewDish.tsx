import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {FormWrapper} from "../common/FormWrapper";
import {AuthContext} from "../services/Auth";
import {uploadFiles} from "../services/Firebase";
import {DishForm, DishFormValue} from "./DishForm";
import {useDishDb} from "./DishDb";


export function NewDish() {
    const currentUser = useContext(AuthContext);

    const history = useHistory()

    const db = useDishDb()

    const saveDish = async (dishValue: DishFormValue) => {
        const {selectedFiles, ...dish} = dishValue

        if (selectedFiles) {
            dish.imageRefs = await uploadFiles(selectedFiles, `images/${currentUser!.uid}`);
        }

        db.add(dish).then(() => history.push("/dishes"))

    };
    return <>
        <FormWrapper title="New Dish">
            <DishForm onSubmit={saveDish}/>
        </FormWrapper>
    </>;
}