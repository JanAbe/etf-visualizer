import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    menuHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        textAlign: 'center'
    },
    expandIconWrapper: {
        justifyContent: 'flex-end'
    },
    expandButton: {
        borderRadius: '50px',
        minWidth: '0px',
        padding: theme.spacing(0.7, 0.7, 0.7, 0.7)
    },
    expandIcon: {
        fontSize: '0.875rem'
    },
}));

const MenuHeader = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.menuHeaderWrapper}>
            <Grid item xs={11} className={classes.header}>
                <h1>ETF Visualizer</h1>
            </Grid>
            <Grid item xs={1}>
                {/* todo: maybe change colour of tooltip depending on dark/light theme. */}
                <Grid container className={classes.expandIconWrapper}>
                    <Tooltip title="Expand" placement="right">
                        <Button variant="outlined" className={classes.expandButton}>
                            <ArrowForwardIosIcon className={classes.expandIcon} width="0" />
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MenuHeader;