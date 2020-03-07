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
        minWidth: '35px',
        padding: '8px 3px 8px 6px'
    },
    expandIcon: {
        fontSize: '1.0rem'
    },
}));


/*
renderExpandButton renders the expand/shrink button
*/
const renderExpandButton = (expanded, expandAction, classes) => {
    /*
    renderTooltip renders a Tooltip element with the 
    correct title depending on if the sidebar is expanded
    or not.
    */
    const renderTooltip = (expanded, children) => {
        const title = expanded ? 'Shrink' : 'Expand';

        return (
            <Tooltip title={title} placement="right">
                { children }
            </Tooltip>
        );
    }

    /*
    renderButton renders a Button element and binds the provided
    action to the OnClick event.
    */
    const renderButton = (classes, expandAction, children) => {
        return (
            <Button variant="outlined" className={classes.expandButton} onClick={expandAction}>
                { children }
            </Button>
        );
    }

    /* 
    renderIcon renders an Icon element based on if the sidebar
    has been expanded or not.
    */
    const renderIcon = (expanded, classes) => {
        if (expanded) {
            return <ArrowBackIos className={classes.expandIcon} />
        }


        return <ArrowForwardIos className={classes.expandIcon} />
    }

    return (
        renderTooltip(
            expanded,
            renderButton(
                classes, 
                expandAction,
                renderIcon(
                    expanded,
                    classes
                )
            )
        )
    );
}

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
                    { renderExpandButton(expanded, expandAction, classes) }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MenuHeader;