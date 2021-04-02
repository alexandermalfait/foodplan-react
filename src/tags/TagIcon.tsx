import {Bookmark} from "@material-ui/icons";
import React from "react";
import {Tag} from "./Tag";

export function TagIcon({ tag, withLabel } : { tag?: Tag, withLabel?: boolean }) {
    const styleProps = tag ? {fill: tag!.color} : {}

    return <>
        <Bookmark style={styleProps} className={"tag-icon"} />

        {withLabel && <span style={{color: tag!.color}}>{tag!.name}</span>}
    </>
}