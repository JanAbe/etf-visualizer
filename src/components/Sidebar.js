import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'; 
import DataTable from './DataTable';
import Searchbar from './Searchbar';
import MenuHeader from './MenuHeader';

const useStyles = makeStyles(theme => ({
    sidebar: {
        width: '33%',
    }
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.sidebar}>
            <MenuHeader />
            {/* <GeneralInfo /> */}
            <Searchbar />
            <DataTable />
        </Grid>
    );
}

export default Sidebar;