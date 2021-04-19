import {FormWrapper} from "../common/FormWrapper";
import {Box, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {TagIcon} from "./TagIcon";
import {AppScreen} from "../AppScreen";
import {CirclePicker} from "react-color";
import {Tag} from "./Tag";
import {Controller, useForm} from "react-hook-form";
import {Delete} from "@material-ui/icons";
import {TagsDb} from "./TagsDb";
import {AuthContext} from "../services/Auth";

function NewTagForm({tagSaved}: { tagSaved: (tag: Tag) => void }) {
    const TAG_COLORS = ['#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']

    const {register, control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: "", color: ""
        }
    })

    function doSubmit(data: Tag) {
        tagSaved(data)
        reset()
    }

    return <>
        <form onSubmit={handleSubmit(doSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        placeholder={"New tag..."}
                        name={"name"}
                        fullWidth
                        inputRef={register({required: true})}
                        required
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        control={control}
                        name="color"
                        required
                        render={({value, onChange}) =>
                            <CirclePicker
                                colors={TAG_COLORS}
                                width="100%"
                                color={value}
                                onChange={e => onChange(e.hex)}
                            />
                        }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button variant="contained" color="primary" type="submit">Save</Button>
                </Grid>
            </Grid>
        </form>

    </>;
}

function TagList({ tags, onDeleteTag } : { tags: Array<Tag>, onDeleteTag: (tag:Tag) => void }) {
    return <>
        <List>
            {Array.from(tags).map(tag =>
                <React.Fragment key={tag.id}>
                    <ListItem>
                        <ListItemIcon>
                            <TagIcon tag={tag}/>
                        </ListItemIcon>
                        <ListItemText>{tag.name}</ListItemText>
                        <ListItemIcon onClick={() => onDeleteTag(tag)}>
                            <Delete/>
                        </ListItemIcon>
                    </ListItem>

                    <Divider/>
                </React.Fragment>
            )}
        </List>
    </>;
}

export function Tags() {
    const [tags, setTags] = useState<Array<Tag>>([])

    const currentUser = useContext(AuthContext)

    const tagsDb = useMemo(() => new TagsDb(currentUser!), [currentUser])

    useEffect(() => tagsDb.snapshot(setTags), [tagsDb])

    function deleteTag(tag:Tag) {
        if (!window.confirm(`Delete ${tag.name}?`)) {
            return
        }

        tagsDb.delete(tag);
    }

    return <>
        <AppScreen>
            <FormWrapper title="Tags">
                <NewTagForm tagSaved={tag => tagsDb.add(tag)}/>

                <Box mt={2}>
                    <TagList tags={tags} onDeleteTag={deleteTag} />
                </Box>
            </FormWrapper>
        </AppScreen>

    </>
}