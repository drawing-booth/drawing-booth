import * as React from 'react';
import { useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import { ReactSketchCanvas } from "react-sketch-canvas";

import { inject, observer } from "mobx-react";
import { autorun } from "mobx";
import compose from "compose-function";

import DrawningStore from '../../../../store/DrawningStore';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    canvas: {
    },
});

interface IDrawningContainerProps {
    height: number;
    width: number;
}

interface IDrawningContainerPrivate {
    drawningStore: DrawningStore
}

const sizeMap: Record<string, number> = {
    'small': 2,
    'medium': 3,
    'high': 4,
};

export const DrawningContainer = ({
    height,
    width,
    drawningStore,
}: IDrawningContainerProps & IDrawningContainerPrivate) => {
    const classes = useStyles();

    const { brushColor, brushSize, isForceClear } = drawningStore;

    useLayoutEffect(() => {
        const dispose = autorun(() => {
            if (drawningStore.isForceClear) {
                setTimeout(() => drawningStore.setIsForceClear(false));
            }
        });
        return () => dispose();
    }, []);

    if (isForceClear) {
        return null;
    } else {
        return (
            <ReactSketchCanvas
                className={classes.canvas}
                style={{height, width}}
                width={`${width}px`}
                height={`${height}px`}
                strokeWidth={sizeMap[brushSize] || 2}
                strokeColor={brushColor}
                background="transparent"
            />
        );
    }
};

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(DrawningContainer) as React.ComponentType<IDrawningContainerProps>;
