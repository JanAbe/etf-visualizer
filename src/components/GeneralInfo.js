import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GeneralInfoSection from './GeneralInfoSection';

const useStyles = makeStyles(theme => ({
    generalInfoWrapper: {
        marginTop: '3em',
        marginBottom: '1em'
    }
}));

const GeneralInfo = () => {
    const classes = useStyles();

    return (
        <div className={classes.generalInfoWrapper}>
            <GeneralInfoSection header="Inception Date" data="October 18, 2012" firstSection={true}/>
            <GeneralInfoSection header="Total Net Assets" data="$56,570,780,496" />
        </div>
    );
}

export default GeneralInfo;