import * as React from 'react';
import { makeStyles } from '@material-ui/core';

import { useRef, useState, useEffect } from 'react';

import PermissionDenied from './PermissionDenied';

interface ICaptureContainerProps {
    height: number;
    width: number;
}

const useStyles = makeStyles({
    root: {
        objectFit: 'cover',
    },
});

export const CaptureContainer = ({
    height,
    width,
}: ICaptureContainerProps) => {
    const elementRef = useRef<HTMLVideoElement>(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const process = async () => {
            const { current: video } = elementRef;
            if (video) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                    video.srcObject = stream;
                    video.play();
                } catch (e) {
                    if (e.name === 'NotAllowedError') {
                        setPermissionDenied(true);
                    }
                    console.log(e);
                }
            }
        };
        process();
    }, [height, width]);

    return permissionDenied ? (
        <video
            className={classes.root}
            ref={elementRef}
            height={height}
            width={width}
        />
    ) : (
        <PermissionDenied
            height={height}
            width={width}
        />
    );
};

export default CaptureContainer;
