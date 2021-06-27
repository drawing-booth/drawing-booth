import * as React from 'react';
import { useState, useEffect } from 'react';

import { inject, observer } from "mobx-react";
import compose from "compose-function";

import { useSnackbar } from 'notistack';

import {
    OneTyped,
    TypedField,
    FieldType,
} from '@tripolskypetr/react-view-builder';

import Container from '@material-ui/core/Container';

import Breadcrumbs from '../../components/common/Breadcrumbs';
import Spacer from './Spacer';

import DrawningStore from '../../store/DrawningStore';

const fields: TypedField[] = [
    {
        type: FieldType.Text,
        inputType: 'number',
        name: 'fadeWidth',
        title: 'Fade width',
        description: 'Right fade width',
        defaultValue: '200',
    },
];

interface IData {
    fadeWidth: string;
}

interface ISettingsPageProps {
    drawningStore: DrawningStore;
}

export const SettingsPage = ({
    drawningStore,
}: ISettingsPageProps) => {

    const [data, setData] = useState<IData>(undefined as never);
    const [save, setSave] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        drawningStore.setIsHeaderCollapsed(true);
        return () => {
            drawningStore.dispose();
        };
    }, []);

    const handleSave = () => {
        try {
            const {
                fadeWidth,
            } = data;
            drawningStore.setFadeWidth(fadeWidth);
            enqueueSnackbar('Saved');
            setSave(false);
        } catch(e) {
            enqueueSnackbar('Config save failed');
            console.error(e)
        }
    };

    const handleChange = (newData: IData, initialChange: boolean) => {
        setData(newData);
        setSave(!initialChange);
    };

    const handleInvalid = (msg: string) => {
        enqueueSnackbar(msg);
        setSave(false);
    };

    return (
        <Container>
            <Breadcrumbs
                backwardTitle="DrawningBooth"
                currentTitle="SettingsPage"
                onSave={handleSave}
                saveDisabled={!save}
            />
            <OneTyped<IData>
                fields={fields}
                invalidity={handleInvalid}
                change={handleChange}
                handler={data}
            />
            <Spacer />
        </Container>
    );
};

SettingsPage.displayName = "SettingsPage";

export default compose(
    inject(({ drawningStore }) => ({ drawningStore })),
    observer,
)(SettingsPage);
