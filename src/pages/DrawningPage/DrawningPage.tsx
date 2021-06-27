import * as React from 'react';
import { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

import preventTouchBehaviour from '../../utils/preventTouchBehaviour';

import { inject, observer } from "mobx-react";
import compose from "compose-function";

import DrawningStore from '../../store/DrawningStore';

import Capture from './layers/Capture';
import Fade from './layers/Fade';
import Drawning from './layers/Drawning';

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
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        drawningStore.setIsHeaderCollapsed(false);
        return () => {
            drawningStore.dispose();
        };
    }, []);

    useEffect(() => {
        const { current: element } = elementRef;
        if (element) {
            const dispose = preventTouchBehaviour(element);
            return () => dispose();
        }
    }, []);

    return (
        <div ref={elementRef} className={classes.root}>
            <Capture />
            <Fade />
            <Drawning />
        </div>
    )
};

DrawningPage.displayName = "DrawningPage";

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(DrawningPage);
