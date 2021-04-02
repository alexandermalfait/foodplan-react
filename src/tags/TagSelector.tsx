import {TagsDb} from "./TagsDb";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/Auth";
import {Tag} from "./Tag";
import {CircularProgress, FormControlLabel, Switch} from "@material-ui/core";
import {useQuery} from "react-query";

export function TagSelector( { onChange, initialTags } : { onChange: (tags:Array<Tag>) => void, initialTags: Array<Tag>}) {

    const currentUser = useContext(AuthContext)

    const [selectedTags, setSelectedTags] = useState<Array<Tag>>(initialTags)

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

    const { isLoading, data:tags } = useQuery('tags', () => new TagsDb(currentUser!).list())

    useEffect(() => setSelectedTags(initialTags), [ tags, initialTags ])

    if (isLoading) {
        return <CircularProgress />;
    }

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
    </>;
}