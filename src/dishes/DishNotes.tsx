import {Assignment} from "@material-ui/icons";
import {ClickAwayListener, IconButton, Tooltip} from "@material-ui/core";
import {useState} from "react";

export function DishNotes(props: { notes: string }) {
    function tooltipContents(notes: string) {
        return <>
            <div style={{whiteSpace: "pre-wrap", fontSize: "medium"}}>{notes}</div>
        </>;
    }

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return <>
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableTouchListener
                title={tooltipContents(props.notes)}
            >
                <IconButton onClick={handleTooltipOpen}>
                    <Assignment />
                </IconButton>
            </Tooltip>
        </ClickAwayListener>
    </>;
}