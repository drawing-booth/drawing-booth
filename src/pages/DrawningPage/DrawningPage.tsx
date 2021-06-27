import * as React from 'react';
import { useEffect } from 'react';

import { inject, observer } from "mobx-react";
import compose from "compose-function";

import DrawningStore from '../../store/DrawningStore';

interface IDrawningPageProps {
    drawningStore: DrawningStore;
}

export const DrawningPage = ({
    drawningStore,
}: IDrawningPageProps) => {

    useEffect(() => {
        drawningStore.setIsHeaderCollapsed(false);
        return () => {
            drawningStore.dispose();
        };
    }, []);

    return <p>123</p>
};

DrawningPage.displayName = "DrawningPage";

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(DrawningPage);
