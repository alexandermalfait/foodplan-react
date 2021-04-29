import React, {useEffect, useState} from "react";
import {Container, createStyles, IconButton, InputAdornment, makeStyles, TextField} from "@material-ui/core";
import {TagSelector} from "../tags/TagSelector";
import {Clear, SearchOutlined} from "@material-ui/icons";
import {Tag} from "../tags/Tag";
import {Dish} from "./Dish";

const useStyles = makeStyles(createStyles({
    tagSelector: {
        textAlign: "center",
        marginBottom: "1em",
    } ,

    textSearch: {
        textAlign: "center",
        marginBottom: "1em",
    } ,
}))

let lastFilteredTags = Array<Tag>()

export class DishListFilterState {
    filteredTags: Tag[]

    filteredText: string

    constructor(filteredTags?: Tag[], filteredText?: string) {
        this.filteredTags = filteredTags || [];
        this.filteredText = filteredText || "";
    }

    public matches(dish: Dish) {
        if (this.filteredTags) {
            if (!this.filteredTags.every(filteredTag => dish.tags.some(dishTag => dishTag.id === filteredTag.id))) {
                return false
            }
        }

        if (this.filteredText) {
            if(!dish.name.toLowerCase().includes(this.filteredText.toLowerCase())) {
                return false
            }
        }

        return true;
    }

    get filled():boolean {
        return !!(this.filteredTags || this.filteredText)
    }
}

export function DishListFilter({filtersUpdated}:{filtersUpdated: (state:DishListFilterState) => void}) {
    const classes = useStyles()

    const [filteredTags, setFilteredTags] = useState(lastFilteredTags)

    const [filteredText, setFilteredText] = useState("")

    useEffect(() => {
        filtersUpdated(new DishListFilterState(filteredTags, filteredText))
    }, [ filteredTags, filteredText, filtersUpdated ])

    useEffect(() => {
        lastFilteredTags = filteredTags
    }, [filteredTags])

    return <>
        <Container className={classes.tagSelector}>
            <TagSelector initialTags={filteredTags} onChange={setFilteredTags}/>
        </Container>

        <Container className={classes.textSearch}>
            <TextField
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start"><SearchOutlined/></InputAdornment>,
                    endAdornment: filteredText &&
                        <InputAdornment position={"end"}>
                            <IconButton onClick={() => setFilteredText("")} size="small">
                                <Clear/>
                            </IconButton>
                        </InputAdornment>
                }}
                value={filteredText}
                onChange={e => setFilteredText(e.currentTarget.value)}
                placeholder={"Search.."}
            />
        </Container>
    </>
}