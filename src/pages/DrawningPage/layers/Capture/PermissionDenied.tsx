import * as React from 'react';
import { makeStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

interface IPermissionDeniedProps {
    height: number;
    width: number;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginTop: '-15vh',
    },
});

export const PermissionDenied = ({
    height,
    width,
}: IPermissionDeniedProps) => {
    const classes = useStyles();
    return (
        <div
            className={classes.root}
            style={{ height, width }}
        >
            <div className={classes.content}>
                <Typography variant="h4">Camera permission denied</Typography>
                <Typography variant="body1">You have blocked camera access. To go drawing, please update your browser settings to allow access</Typography>
            </div>
        </div>
    );
}

export default PermissionDenied;
