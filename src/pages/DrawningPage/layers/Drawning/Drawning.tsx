import * as React from 'react';
import { makeStyles } from '@material-ui/core';

import AutoSizer from '../../../../components/common/AutoSizer';

import DrawningContainer from './DrawningContainer';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export const Drawning = () => {
    const classes = useStyles();
    return (
        <AutoSizer className={classes.root} target={document.body}>
            {({
                height,
                width,
            }) => (
                <DrawningContainer
                    height={height}
                    width={width}
                />
            )}
        </AutoSizer>
    );
}

export default Drawning;
