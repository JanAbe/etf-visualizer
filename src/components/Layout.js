import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    layout: {
        display: 'flex',
        height: '100vh',
        
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        }
    }
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            { children }
        </div>
    );
} 

export default Layout;