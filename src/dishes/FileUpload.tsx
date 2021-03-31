import React, {useRef, useState} from "react";
import {Button, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {AttachFile} from "@material-ui/icons";

export function FileUpload({onChange}: { onChange: (files: FileList) => void }) {
    const fileFieldRef = useRef<HTMLInputElement>(null)

    const [selectedFiles, setSelectedFiles] = useState<FileList>()

    return <>
        <input
            type="file"
            ref={fileFieldRef}
            name="selectedFiles"
            multiple={true}
            style={{display: "none"}}
            accept="image/*"
            onChange={e => {
                const fileList = e.currentTarget.files!;

                setSelectedFiles(fileList);
                onChange(fileList);
            }}
        />

        <Button variant="contained" color="primary" onClick={() => fileFieldRef.current!.click()}>Select image</Button>

        {selectedFiles && <FileSelection files={selectedFiles}/>}
    </>
}

function FileSelection({ files } : { files: FileList }) {
    return <List>
        {Array.from(files).map(file =>
            <ListItem key={file.name}>
                <ListItemIcon>
                    <AttachFile />
                </ListItemIcon>
                <ListItemText>{file.name}</ListItemText>
            </ListItem>
        )}
    </List>;
}