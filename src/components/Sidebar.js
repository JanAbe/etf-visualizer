import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'; 
import DataTable from './DataTable';
import Searchbar from './Searchbar';
import MenuHeader from './MenuHeader';

const useStyles = makeStyles(theme => ({
    sidebar: {
        paddingLeft: '1.5%',
        paddingRight: '1.5%',
        boxShadow: '5px 1px 10px 0px rgba(50, 50, 50, 0.3)',
        zIndex: 1,
        transition: 'width 0.8s'
    },
    defaultWidth: {
        width: '20%'
    },
    expandedWidth: {
        width: '40%',
    }
}));

const Sidebar = ({ expanded, expandAction }) => {
    const classes = useStyles();

    return (
        <Grid className={[expanded ? classes.expandedWidth : classes.defaultWidth, classes.sidebar].join(' ')}>
            <MenuHeader expanded={expanded} expandAction={expandAction} />
            <Divider />
            {/* <GeneralInfo /> */}
            <Searchbar />
            <DataTable />
        </Grid>
    );
}

export default Sidebar;