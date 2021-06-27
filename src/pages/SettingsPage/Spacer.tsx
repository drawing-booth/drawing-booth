import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        paddingTop: '20vh',
    },
});

export const Spacer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} />
    );
};

export default Spacer;
