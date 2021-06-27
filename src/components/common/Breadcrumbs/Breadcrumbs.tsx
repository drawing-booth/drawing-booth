import * as React from 'react';

import classNames from 'classnames';

import MatBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      flexDirection: 'row',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    stretch: {
      flexGrow: 1,
      shrink: 1,
    },
});

interface IBreadcrumbsProps {
    onBack?: () => void;
    onSave?: () => void;
    currentTitle?: string;
    backwardTitle?: string;
    saveLabel?: string;
    saveDisabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const Breadcrumbs = ({
    onBack,
    onSave,
    currentTitle = 'Card',
    backwardTitle = 'List',
    saveLabel = 'Save',
    saveDisabled = true,
    className = '',
    ...otherProps
}: IBreadcrumbsProps) => {
    const classes = useStyles();
    return (
        <Box
            className={classNames(classes.root, className)}
            {...otherProps}
        >
            <MatBreadcrumbs
                className={classes.stretch}
                aria-label="breadcrumb"
            >
                <Link
                    color="inherit"
                    onClick={onBack}
                >
                    {backwardTitle}
                </Link>
                <Typography color="textPrimary">
                    {currentTitle}
                </Typography>
            </MatBreadcrumbs>
            <Button
                disabled={saveDisabled}
                variant="contained"
                color="primary"
                onClick={onSave}
            >
                {saveLabel}
            </Button>
        </Box>
    );
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
