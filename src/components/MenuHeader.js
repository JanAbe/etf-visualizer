import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
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

const MenuHeader = ({ expanded, expandAction }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.menuHeaderWrapper}>
            <Grid item xs={11} className={classes.header}>
                <h1>ETF Visualizer</h1>
            </Grid>
            <Grid item xs={1}>
                {/* todo: maybe change colour of tooltip depending on dark/light theme. */}
                <Grid container className={classes.expandIconWrapper}>
                    {/* todo: conditionally change title of tooltip, depending on if sidebar is expanded or not */}
                    <Tooltip title="Expand" placement="right">
                        <Button variant="outlined" className={classes.expandButton} onClick={expandAction}>
                            {/* todo: find out nicer way to conditionally render this */}
                            {expanded ? (
                                <ArrowBackIos className={classes.expandIcon} width="0" />
                            ) : (
                                <ArrowForwardIos className={classes.expandIcon} width="0" />
                            )}
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MenuHeader;