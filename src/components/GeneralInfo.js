import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import GeneralInfoSection from './GeneralInfoSection';

const useStyles = makeStyles(theme => ({
    generalInfoWrapper: {
        marginTop: '1em',
        marginBottom: '1em',
        padding: '20px'
    }
}));

const GeneralInfo = () => {
    const classes = useStyles();

    return (
        <Paper>
            <div className={classes.generalInfoWrapper}>
                <GeneralInfoSection header="Inception Date" data="October 18, 2012" firstSection={true}/>
                <GeneralInfoSection header="Total Net Assets" data="$56,570,780,496" />
            </div>
        </Paper>
    );
}

export default GeneralInfo;