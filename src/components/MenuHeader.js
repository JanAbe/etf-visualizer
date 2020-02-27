import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Button, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
    },
    fullHeight: {
        height: '100%',
    },
    fullWidth: {
        width: '100%'
    },
    width40: {
        width: '20%',
    },
    width60: {
        width: '80%',
    },
    dark: {
        backgroundColor: '#303030',
        color: 'white',
    },
    centerText: {
        textAlign: 'center'
    },
    textWhite: {
        color: 'white'
    },
    paddingHorizontal: {
        paddingLeft: '15px',
        paddingRight: '15px',
    },
    searchbar: {
        borderRadius: theme.shape.borderRadius,
        marginBottom: '10px',
    },
    searchInput: {
        padding: theme.spacing(0.6, 2.0, 0.6, 1.5),
        backgroundColor: fade(theme.palette.common.white, 0.11),
        borderRadius: '4px 0px 0px 4px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
    },
    searchButton: {
        height: '100%',
        fontSize: '13px',
        borderRadius: '0px 4px 4px 0px',
        backgroundColor: fade(theme.palette.common.white, 0.18),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    searchButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    noPaddingLeft: {
        paddingLeft: 0
    },
    noPaddingRight: {
        paddingRight: 0
    },
    titleSection: {
        width: '100%'
    },
    expandIcon: {
        fontSize: '0.875rem'
    },
    expandButton: {
        borderRadius: '20px',
        minWidth: '30px',
        padding: theme.spacing(0, 0, 0, 0),
        height: '25%',
        backgroundColor: 'rgba(255, 255, 255, 0.24)',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.45),
        },
        marginTop: '5px',
        marginRight: '5px',
    },
    expandButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
}));

const MenuHeader = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.titleSection}>
            <Grid item xs={10}>
                <h2>ETF Visualizer</h2>
                <h5>Search. Select. Visualize.</h5>
            </Grid>
            <Grid item xs={2} className={classes.expandButtonWrapper}>
                <Tooltip title="Expand" placement="right">
                    <Button variant='contained' className={[classes.expandButton, classes.textWhite].join(' ')}>
                        <ArrowForwardIosIcon className={classes.expandIcon} />
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

export default MenuHeader;