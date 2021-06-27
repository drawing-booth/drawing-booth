import * as React from 'react';
import { useRouter } from 'react-router5';
import { useState, useEffect, createElement } from "react";

import classNames from 'classnames';

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Collapse from "@material-ui/core/Collapse";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from "@material-ui/icons/Menu";
import Help from "@material-ui/icons/Help";
import Flip from "@material-ui/icons/Flip";
import Close from "@material-ui/icons/Close";
import Palette from "@material-ui/icons/Palette";
import LineWeight from "@material-ui/icons/LineWeight";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";

import { makeStyles } from '@material-ui/core';

import Logo from '../Logo';

import { inject, observer } from "mobx-react";
import compose from "compose-function";

import DrawningStore from '../../../store/DrawningStore';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 999,
        '& header.MuiPaper-root': {
            transition: `background 250ms`,
        },
    },
    noHeaderElevation: {
        '& header.MuiPaper-root': {
            boxShadow: 'none',
        },
    },
    stretch: {
        flexGrow: 1,
    },
    appBarCollapsed: {
        background: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    appBar: {
        background: 'transparent',
        color: 'white',
    },
    offset: theme.mixins.toolbar,
    hide: {
        display: 'none',
    },
}));

const handleHelpClick = () => {
    const a = document.createElement('a');
    a.href = 'https://www.behance.net/tripolskypetr';
    a.target = '_blank';
    a.click();
};

interface IScaffoldProps {
    children: React.ReactChild;
    pages?: {
        icon: React.ComponentType;
        label: string;
        name: string;
    }[];
    className?: string;
    style?: React.CSSProperties;
}

interface IScaffoldPrivate {
    drawningStore: DrawningStore;
}

export const Scaffold = ({
    children,
    pages = [],
    className,
    style,
    drawningStore,
}: IScaffoldProps & IScaffoldPrivate) => {

    const [opened, setOpened] = useState(false);
    const [colorAnchorEl, setColorAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [sizeAnchorEl, setSizeAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [inFullscreen, setFullscreen] = useState<boolean>(false);
    const classes = useStyles();

    useEffect(() => {
        const interval = setInterval(() => {
            const current = document.fullscreenElement !== null;
            if (inFullscreen !== current) {
                setFullscreen(current);
            }
        }, 1_000);
        return () => clearInterval(interval);
    }, [inFullscreen]);

    const { navigate } = useRouter();

    const handleMenuToggle = () => setOpened(!opened);

    const createMenuClickHandler = (name: string) => () => {
        setOpened(false);
        navigate(name);
    };

    const { isReverse, isDrawningBlocked, brushColor, brushSize } = drawningStore;

    const handleReverse = () => drawningStore.setIsReverse(!isReverse);

    const handleClear = () => drawningStore.setIsForceClear(true);

    const handleColorMenuClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>) => {
        setColorAnchorEl(currentTarget);
    };

    const handleFullscreen = () => {
        if (inFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    const handleColorMenuClose = () => {
        setColorAnchorEl(null);
    };

    const handleSizeMenuClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>) => {
        setSizeAnchorEl(currentTarget);
    };
    
    const handleSizeMenuClose = () => {
        setSizeAnchorEl(null);
    };

    const createHandleSizeMenuChoose = (size: string) => () => {
        drawningStore.setBrushSize(size);
        handleSizeMenuClose();
    };

    const createHandleColorMenuChoose = (color: string) => () => {
        drawningStore.setBrushColor(color);
        handleColorMenuClose();
    };

    return (
        <div 
            className={classNames(classes.root, {
                [classes.noHeaderElevation]: !drawningStore.isHeaderCollapsed,
            }, className)}
        >
            <CssBaseline />
            <Drawer
                open={opened}
                onClose={() => setOpened(false)}
            >
                <Logo/>
                <List
                    style={{ minWidth: "240px" }}
                >
                    {pages.map(({ icon, name, label }, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={createMenuClickHandler(name)}
                        >
                            <ListItemIcon>
                                {createElement(icon)}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <AppBar
                className={classNames({
                    [classes.appBarCollapsed]: drawningStore.isHeaderCollapsed,
                    [classes.appBar]: !drawningStore.isHeaderCollapsed,
                })}
                position="fixed"
                style={style}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={handleMenuToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.stretch} />
                    <IconButton
                        color="inherit"
                        onClick={handleFullscreen}
                    >
                        {inFullscreen ? <FullscreenExit /> : <Fullscreen />}
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-controls="color-menu"
                        aria-haspopup="true"
                        disabled={isDrawningBlocked}
                        style={{color: brushColor || 'white'}}
                        onClick={handleColorMenuClick}
                    >
                        <Palette />
                    </IconButton>
                    <Menu
                        id="color-menu"
                        anchorEl={colorAnchorEl}
                        keepMounted
                        open={!!colorAnchorEl}
                        onClose={handleColorMenuClose}
                    >
                        <MenuItem disabled={brushColor === 'red'} onClick={createHandleColorMenuChoose('red')}>Red</MenuItem>
                        <MenuItem disabled={brushColor === 'green'} onClick={createHandleColorMenuChoose('green')}>Green</MenuItem>
                        <MenuItem disabled={brushColor === 'blue'} onClick={createHandleColorMenuChoose('blue')}>Blue</MenuItem>
                    </Menu>
                    <IconButton
                        color="inherit"
                        aria-controls="size-menu"
                        aria-haspopup="true"
                        disabled={isDrawningBlocked}
                        onClick={handleSizeMenuClick}
                    >
                        <LineWeight />
                    </IconButton>
                    <Menu
                        id="size-menu"
                        anchorEl={sizeAnchorEl}
                        keepMounted
                        open={!!sizeAnchorEl}
                        onClose={handleSizeMenuClose}
                    >
                        <MenuItem disabled={brushSize === 'small'} onClick={createHandleSizeMenuChoose('small')}>Small</MenuItem>
                        <MenuItem disabled={brushSize === 'medium'} onClick={createHandleSizeMenuChoose('medium')}>Medium</MenuItem>
                        <MenuItem disabled={brushSize === 'high'} onClick={createHandleSizeMenuChoose('high')}>High</MenuItem>
                    </Menu>
                    <IconButton
                        color="inherit"
                        disabled={isDrawningBlocked}
                        onClick={handleClear}
                    >
                        <Close />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        disabled={isDrawningBlocked}
                        onClick={handleReverse}
                    >
                        <Flip />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleHelpClick}
                    >
                        <Help />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Collapse in={drawningStore.isHeaderCollapsed}>
                <div className={classes.offset} />
            </Collapse>
            <div>
                {children}
            </div>
        </div>
    );
};

Scaffold.displayName = 'Scaffold';

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(Scaffold) as React.ComponentType<IScaffoldProps>;
