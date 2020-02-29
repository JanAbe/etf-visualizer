import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    generalInfoWrapper: {
        marginTop: '3em',
        marginBottom: '1em'
    },
    generalInfoSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
}));

const GeneralInfo = () => {
    const classes = useStyles();

    return (
        <div className={classes.generalInfoWrapper}>
            <Grid item xs={11} className={classes.generalInfoSection}>
                <div>
                    Inception Date:                    
                </div>
                <div>
                    14/01/2006
                </div>
            </Grid>
            <Grid item xs={11} className={classes.generalInfoSection}>
                <div>
                    Total Net Assets:                    
                </div>
                <div>
                    $2,212,404,432
                </div>
            </Grid>
        </div>
    );
}

export default GeneralInfo;