import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
		justifyContent: 'space-evenly',

		[theme.breakpoints.down('750')]: {
			justifyContent: 'space-around'
		}
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

		// [theme.breakpoints.down('750')]: {
		// 	marginLeft: '0.5em',
		// 	marginRight: '0.5em'
		// }
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
	leftMargin: {
		marginLeft: '1em'
	},
	rightMargin: {
		marginRight: '1em'
	},
	defaultMargin: {
		marginLeft: '0.75em',
		marginRight: '0.75em',
	},
	smallMargin: {
		marginLeft: '0.5em',
		marginRight: '0.5em',
	}
}));

// renders the legend correctly, based on if the screen is small, if the sidebar has been expanded,
// or if the user prefers darkmode
const renderLegend = (prefersDarkMode, expanded, isSmallScreen, classes) => {
	if (prefersDarkMode) {
		if (isSmallScreen) {
			return (
				<>
				<div className={[classes.colorDark1, classes.size, classes.smallMargin].join(' ')}></div>
				<div className={[classes.colorDark2, classes.size, classes.smallMargin].join(' ')}></div>
				<div className={[classes.colorDark3, classes.size, classes.smallMargin].join(' ')}></div>
				<div className={[classes.colorDark4, classes.size, classes.smallMargin].join(' ')}></div>
				<div className={[classes.colorDark5, classes.size, classes.smallMargin].join(' ')}></div>
				<div className={[classes.colorDark6, classes.size, classes.smallMargin].join(' ')}></div>
				</>
			);
		}

		return (
			<>
			<div className={[classes.colorDark1, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
			<div className={[classes.colorDark2, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
			<div className={[classes.colorDark3, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
			<div className={[classes.colorDark4, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
			<div className={[classes.colorDark5, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
			<div className={[classes.colorDark6, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
			</>
		);
	}

	if (isSmallScreen) {
		return (
			<>
			<div className={[classes.color1, classes.size, classes.smallMargin].join(' ')}></div>
			<div className={[classes.color2, classes.size, classes.smallMargin].join(' ')}></div>
			<div className={[classes.color3, classes.size, classes.smallMargin].join(' ')}></div>
			<div className={[classes.color4, classes.size, classes.smallMargin].join(' ')}></div>
			<div className={[classes.color5, classes.size, classes.smallMargin].join(' ')}></div>
			<div className={[classes.color6, classes.size, classes.smallMargin].join(' ')}></div>
			</>
		);
	}

	return (
		<>
		<div className={[classes.color1, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
		<div className={[classes.color2, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
		<div className={[classes.color3, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
		<div className={[classes.color4, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
		<div className={[classes.color5, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
		<div className={[classes.color6, classes.size, expanded ? classes.defaultMargin : classes.smallMargin].join(' ')}></div>
		</>
	);
}

const Legend = ({ prefersDarkMode, expanded }) => {
	const classes = useStyles();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('750'));

	return (
		<Paper style={{marginBottom: '1em'}}>
			<div className={classes.wrapper}>
				{ renderLegend(prefersDarkMode, expanded, isSmallScreen, classes) }
			</div>
			<div className={classes.legendTextWrapper}>
				<div className={[classes.legendText, classes.leftMargin].join(' ')}>
					<ArrowBack fontSize='small' />
					<p className={classes.leftText}>
						Less Invested
					</p>
				</div>
				<div className={[classes.legendText, classes.rightMargin].join(' ')}>
					<p className={classes.rightText}>
						More Invested
					</p>
					<ArrowForward fontSize='small' />
				</div>
			</div>
		</Paper>
	);
}

export default Legend;