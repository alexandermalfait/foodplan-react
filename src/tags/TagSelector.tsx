import {TagsDb} from "./TagsDb";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/Auth";
import {Tag} from "./Tag";
import {FormControlLabel, Switch} from "@material-ui/core";

export function TagSelector( { onChange, initialTags } : { onChange: (tags:Array<Tag>) => void, initialTags: Array<Tag>}) {

    const currentUser = useContext(AuthContext)

    const [tags, setTags] = useState<Array<Tag>>([])

    const [selectedTags, setSelectedTags] = useState<Array<Tag>>([])

    function setTagSelected(tag: Tag, selected: boolean) {
        let newSelectedTags

        if (selected) {
            newSelectedTags = [...selectedTags, tag];
        }
        else {
            newSelectedTags = selectedTags.filter(t => t.id !== tag.id)
        }

        setSelectedTags(newSelectedTags)
        onChange(newSelectedTags)
    }

    useEffect(() => {
        const tagsDb = new TagsDb(currentUser!)

        tagsDb.list().then(tags => {
            setTags(tags)
            setSelectedTags(initialTags)
        })

    }, [currentUser,initialTags])

    return <>
        <div>
            {tags && tags.map(tag =>
                <FormControlLabel
                    key={tag.id}
                    control={
                        <Switch
                            style={{color: tag.color}}
                            checked={selectedTags.some(t => t.id === tag.id)}
                            onChange={e => setTagSelected(tag, e.target.checked)}
                        />
                    }
                    label={tag.name}
                />
            )}
        </div>
    </>
}