import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'; 
import DataTable from './DataTable';
import SubHeader from './SubHeader';
import MenuHeader from './MenuHeader';
import GeneralInfo from './GeneralInfo';
import Legend from './Legend';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    sidebar: {
        paddingLeft: '2em',
        paddingRight: '2em',
        boxShadow: '5px 1px 10px 0px rgba(50, 50, 50, 0.3)',
        zIndex: 1,
        transition: 'width 0.3s',
        overflowY: 'scroll',
    },
    defaultWidth: {
        width: '20%'
    },
    expandedWidth: {
        width: '40%',
    },
    fullWidth: {
        width: '100%'
    }
}));

const Sidebar = ({ data, prefersDarkMode, expanded, expandAction }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    // returns the width based on the screen size of the user
    // and if the sidebar has been expanded or not
    const getWidth = () => { 
        if (isSmallScreen) {
            return classes.fullWidth;
        }

        return expanded ? classes.expandedWidth : classes.defaultWidth;
    }

    return (
        <Grid className={[classes.sidebar, getWidth()].join(' ')}>
            <MenuHeader expanded={expanded} expandAction={expandAction} />
            <SubHeader />
            <Divider />
            <GeneralInfo />
            <DataTable data={data} expanded={expanded} />
            <Legend prefersDarkMode={prefersDarkMode} />
        </Grid>
    );
}

export default Sidebar;