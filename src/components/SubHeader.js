import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    menuSubHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    subHeader: {
        textAlign: 'center',
        marginTop: '0px'
    }
}));


const SubHeader = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.menuSubHeaderWrapper}>
            <Grid item xs={11} >
                <p className={classes.subHeader}>
                    Visualize the Northern Trust Emerging Markets ETF as of 31/01/2020
                </p>
            </Grid>
        </Grid>
    );
}

export default SubHeader;