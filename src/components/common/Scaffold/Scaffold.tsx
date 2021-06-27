import * as React from 'react';
import { useRouter } from 'react-router5';
import { useState, createElement } from "react";

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

import Menu from "@material-ui/icons/Menu";
import Help from "@material-ui/icons/Help";

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
    const classes = useStyles();

    const { navigate } = useRouter();

    const handleMenuToggle = () => setOpened(!opened);

    const createMenuClickHandler = (name: string) => () => {
        setOpened(false);
        navigate(name);
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
                        <Menu />
                    </IconButton>
                    <div className={classes.stretch} />
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
