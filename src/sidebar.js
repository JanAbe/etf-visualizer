import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, Button, fade } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'; 
import SearchIcon from '@material-ui/icons/Search';
import Map from './map';

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
    },
    fullHeight: {
        height: '100%',
    },
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        <div className={classes.fullHeight}>
            <Grid container className={classes.fullHeight}>
                <Grid item xs={3} >
                    <Paper>
                        <Button variant='contained' color='primary'>Click here 1</Button>
                        <Divider/>
                        <Button variant='contained' color='primary'>Click here 2</Button>
                        <Divider/>
                        <ol>
                            <li>China</li>
                            <li>Italy</li>
                            <li>Congo</li>
                        </ol>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Map className={classes.map}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Sidebar;