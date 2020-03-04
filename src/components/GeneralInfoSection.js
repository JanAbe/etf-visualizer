import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
	},
	marginTop: {
		paddingTop: '0.4em'
	},
	noMarginTop: {
		paddingTop: '0'
	}
}));

const GeneralInfoSection = ({ header, data, firstSection=false }) => {
	const classes = useStyles();

	return (
		<Grid item xs={11} className={[classes.section, firstSection ? classes.noMarginTop : classes.marginTop].join(' ')}>
			<div>
				{ header }:
			</div>
			<div>
				{ data }
			</div>
		</Grid>
	);
}

export default GeneralInfoSection;