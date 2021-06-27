import * as React from 'react';
import { makeStyles } from '@material-ui/core';

import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';

import PermissionDenied from './PermissionDenied';

import { inject, observer } from "mobx-react";
import { autorun } from 'mobx';
import compose from "compose-function";

import DrawningStore from '../../../../store/DrawningStore';

interface ICaptureContainerProps {
    height: number;
    width: number;
}

interface ICaptureContainerPrivate {
    drawningStore: DrawningStore;
}

const useStyles = makeStyles({
    root: {},
});

export const CaptureContainer = ({
    height,
    width,
    drawningStore,
}: ICaptureContainerProps & ICaptureContainerPrivate) => {
    const elementRef = useRef<HTMLCanvasElement>(null);
    const contextRef: React.MutableRefObject<CanvasRenderingContext2D> = useRef<CanvasRenderingContext2D>(null as never);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [reverse, setReverse] = useState(drawningStore.isReverse);
    const classes = useStyles();

    const applyReverse = useCallback(() => {
        const { current: ctx } = contextRef;
        if (ctx) {
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
        }
    }, [width]);

    useEffect(() => {

        let animationFrame: number | null = null;

        const process = async () => {
            const { current: canvas } = elementRef;
            if (canvas) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });

                    const video = document.createElement('video');
                    video.setAttribute('height', height.toString());
                    video.setAttribute('width', width.toString()); 
                    video.style.objectFit = 'cover';

                    video.srcObject = stream;

                    await new Promise<void>((res) => {
                        video.onloadedmetadata = () => {
                          video.play()
                          res();
                        }
                    });

                    const ctx = canvas.getContext('2d')!;
                    contextRef.current = ctx;

                    if (reverse && width !== 0 && height !== 0) {
                        ctx.translate(width, 0);
                        ctx.scale(-1, 1);
                    }

                    const loop = () => {
                        if (stream.active) {
                            ctx.clearRect(0, 0, width, height);
                            ctx.drawImage(video, 0, 0, width, height);
                            animationFrame = requestAnimationFrame(loop);
                        }
                    }
                    
                    loop();

                } catch (e) {
                    if (e.name === 'NotAllowedError') {
                        drawningStore.setIsDrawningBlocked(true);
                        setPermissionDenied(true);
                    } else {
                        throw e;
                    }
                }
            }
        };
        process();
        return () => {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }
        }
    }, [height, width]);

    useLayoutEffect(() => {
        const dispose = autorun(() => {
            if (drawningStore.isReverse !== reverse) {
                setReverse(drawningStore.isReverse);
                applyReverse();
            }
        });
        return () => dispose();
    }, [applyReverse, reverse]);

    return !permissionDenied ? (
        <canvas
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

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(CaptureContainer) as React.ComponentType<ICaptureContainerProps>;
