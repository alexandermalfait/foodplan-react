import {Button, FormControl, TextField} from "@material-ui/core";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Dish} from "./Dish";

function DishForm() {
    const {register, handleSubmit, control} = useForm()

    const onSubmit = (dishy: Dish) => console.log(dishy)

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                <Controller
                    name="name"
                    as={
                        <TextField label="Dish name" required={true} fullWidth/>
                    }
                    control={control}
                    defaultValue=""
                />
            </FormControl>

            <FormControl fullWidth>
                <Controller
                    name="url"
                    as={
                        <TextField label="Dish URL" type="url" fullWidth placeholder="http://some-url"/>
                    }
                    control={control}
                    defaultValue=""
                />
            </FormControl>

            <FormControl fullWidth>
                <Button type="submit" variant="contained">Submit it!</Button>
            </FormControl>
        </form>
    </>;
}

export function NewDish() {

    return <>
        <h1>New dish</h1>

        <DishForm/>
    </>;
}