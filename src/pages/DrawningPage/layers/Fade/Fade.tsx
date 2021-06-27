import * as React from 'react';
import { makeStyles } from '@material-ui/core';

import AutoSizer from '../../../../components/common/AutoSizer';

import { inject, observer } from "mobx-react";
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
    container: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    fade: {
        background: `linear-gradient(
            to right,
            #0000,
            #000
        )`,
        marginRight: -5,
    },
});

interface IFadeProps {
}

interface IFadePrivate {
    drawningStore: DrawningStore
}

export const Fade = ({
    drawningStore,
}: IFadeProps & IFadePrivate) => {
    const classes = useStyles();

    const { fadeWidth, isDrawningBlocked } = drawningStore;

    return (
        <AutoSizer className={classes.root} target={document.body}>
            {({
                height,
                width,
            }) => (
                <div 
                    className={classes.container}
                    style={{ height, width }}
                >
                    {!isDrawningBlocked && (
                        <div
                            className={classes.fade}
                            style={{ height, width: `${fadeWidth}px` }}
                        />
                    )}
                </div>
            )}
        </AutoSizer>
    );
};

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(Fade) as React.ComponentType<IFadeProps>;
