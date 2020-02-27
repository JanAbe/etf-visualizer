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
        width: '33%',
        boxShadow: '5px 1px 10px 0px rgba(50, 50, 50, 0.3)',
        zIndex: 1
    }
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.sidebar}>
            <MenuHeader />
            <Divider />
            {/* <GeneralInfo /> */}
            <Searchbar />
            <DataTable />
        </Grid>
    );
}

export default Sidebar;