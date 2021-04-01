import {Bookmark} from "@material-ui/icons";
import React from "react";
import {Tag} from "./Tag";

export function TagIcon({ tag } : { tag?: Tag }) {
    const styleProps = tag ? {fill: tag!.color} : {}

    return <Bookmark style={styleProps} />
}