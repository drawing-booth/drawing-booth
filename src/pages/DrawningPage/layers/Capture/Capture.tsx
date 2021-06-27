import * as React from 'react';
import { makeStyles } from '@material-ui/core';

import AutoSizer from '../../../../components/common/AutoSizer';

import CaptureContainer from './CaptureContainer';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export const Capture = () => {
    const classes = useStyles();
    return (
        <AutoSizer className={classes.root} target={document.body}>
            {({
                height,
                width,
            }) => (
                <CaptureContainer
                    height={height}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};

export default Capture;
