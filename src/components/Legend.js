import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowForward, ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1.5em',
        padding: '20px 20px 0px 20px'
	},
	legendTextWrapper: {
		display: 'flex',
		justifyContent: 'space-evenly'
	},
	legendText: {
		display: 'flex',
		alignItems: 'center'
	},
	leftText: {
		marginLeft: '1em'
	},
	rightText: {
		marginRight: '1em'
	},
	size: {
		width: '2em',
		height: '2em',
		marginLeft: '0.75em',
		marginRight: '0.75em'
	},
	color1: {
		backgroundColor: 'rgb(1, 152, 189)',
	},
	color2: {
		backgroundColor: 'rgb(73, 227, 206)'
	},
	color3: {
		backgroundColor: 'rgb(216, 254, 181)'
	},
	color4: {
		backgroundColor: 'rgb(254, 237, 177)'
	},
	color5: {
		backgroundColor: 'rgb(254, 173, 84)'
	},
	color6: {
		backgroundColor: 'rgb(209, 55, 78)'
	},
	colorDark1: {
		backgroundColor: 'rgb(217, 240, 163)'
	},
	colorDark2: {
		backgroundColor: 'rgb(173, 221, 142)'
	},
	colorDark3: {
		backgroundColor: 'rgb(120, 198, 121)'
	},
	colorDark4: {
		backgroundColor: 'rgb(49, 163, 84)'
	},
	colorDark5: {
		backgroundColor: 'rgb(0, 104, 55)'
	},
	colorDark6: {
		backgroundColor: 'rgb(0, 51, 0)'
	},
}));

const renderLegend = (prefersDarkMode, classes) => {
	if (prefersDarkMode) {
		return (
			<>
			<div className={[classes.colorDark1, classes.size].join(' ')}></div>
			<div className={[classes.colorDark2, classes.size].join(' ')}></div>
			<div className={[classes.colorDark3, classes.size].join(' ')}></div>
			<div className={[classes.colorDark4, classes.size].join(' ')}></div>
			<div className={[classes.colorDark5, classes.size].join(' ')}></div>
			<div className={[classes.colorDark6, classes.size].join(' ')}></div>
			</>
		);
	}

	return (
		<>
		<div className={[classes.color1, classes.size].join(' ')}></div>
		<div className={[classes.color2, classes.size].join(' ')}></div>
		<div className={[classes.color3, classes.size].join(' ')}></div>
		<div className={[classes.color4, classes.size].join(' ')}></div>
		<div className={[classes.color5, classes.size].join(' ')}></div>
		<div className={[classes.color6, classes.size].join(' ')}></div>
		</>
	);
}

const Legend = ({ prefersDarkMode }) => {
	const classes = useStyles();

	return (
		<Paper>
			<div className={classes.wrapper}>
				{ renderLegend(prefersDarkMode, classes) }
			</div>
			<div className={classes.legendTextWrapper}>
				<div className={classes.legendText}>
					<ArrowBack fontSize='small' />
					<p className={classes.leftText}>
						Less Money Invested
					</p>
				</div>
				<div className={classes.legendText}>
					<p className={classes.rightText}>
						More Money Invested
					</p>
					<ArrowForward fontSize='small' />
				</div>
			</div>
		</Paper>
	);
}

export default Legend;