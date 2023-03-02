import {Assignment} from "@material-ui/icons";
import {Button, Tooltip} from "@material-ui/core";

export function DishNotes(props: { notes: string }) {
    function tooltipContents(notes: string) {
        return <>
            <div style={{whiteSpace: "pre-wrap", fontSize: "medium"}}>{notes}</div>
        </>;
    }

    return <>
        <Tooltip title={tooltipContents(props.notes)}>
            <Button>
                <Assignment/>
            </Button>
        </Tooltip>
    </>;
}