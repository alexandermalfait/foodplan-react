import React from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";

type MenuItemOption = { title: string, action: () => void };

interface Props {
    icon: React.ReactNode,
    menuItems: MenuItemOption[]
}

export function IconButtonWithPopupMenu({ icon, menuItems } : Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    function activateMenuItem(menuItem: MenuItemOption) {
        menuItem.action();
        handleClose()
    }

    return <>
        <IconButton size="small" onClick={handleClick}>
            {icon}
        </IconButton>

        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{vertical: "top", horizontal: "left"}}
            transformOrigin={{vertical: "top", horizontal: -30}}
        >
            {menuItems.map(menuItem =>
                <MenuItem key={menuItem.title} onClick={() => activateMenuItem(menuItem)}>{menuItem.title}</MenuItem>
            )}
        </Menu>
    </>
}