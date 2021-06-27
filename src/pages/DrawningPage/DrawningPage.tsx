import * as React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import { inject, observer } from "mobx-react";
import compose from "compose-function";

import DrawningStore from '../../store/DrawningStore';

import Capture from './layers/Capture';
import Fade from './layers/Fade';

interface IDrawningPageProps {
    drawningStore: DrawningStore;
}

const useStyles = makeStyles({
    root: {
        position: 'relative',
    },
});

export const DrawningPage = ({
    drawningStore,
}: IDrawningPageProps) => {
    const classes = useStyles();

    useEffect(() => {
        drawningStore.setIsHeaderCollapsed(false);
        return () => {
            drawningStore.dispose();
        };
    }, []);

    return (
        <div className={classes.root}>
            <Capture />
            <Fade />
        </div>
    )
};

DrawningPage.displayName = "DrawningPage";

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(DrawningPage);
