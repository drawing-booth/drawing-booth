import { makeStyles } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FormatPaint from '@material-ui/icons/FormatPaint';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '5px',
        minHeight: '125px',
    },
    logo: {
        fontSize: '45px',
    },
});

export const Logo = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <IconButton>
                <FormatPaint
                    className={classes.logo}
                />
            </IconButton>
            <Typography>
                HypeNet
            </Typography>
        </div>
    );
};

export default Logo;
