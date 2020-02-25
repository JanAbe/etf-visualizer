import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Divider, Button, fade } from '@material-ui/core';
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
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom: '10px',
        width: '100%',
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10px'
    },
    searchInput: {
        padding: theme.spacing(0.6, 1, 0.6, 5.5),
    },
    searchButton: {
        height: '100%',
        fontSize: '13px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)'
    },
    searchButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.fullHeight}>
            {/* sidebar section */}
            <Grid item className={[classes.width40, classes.dark, classes.centerText, classes.paddingHorizontal].join(' ')}>
                {/* Title section */}
                <h2>ETF Visualizer</h2>
                <Divider />

                {/* Searchbar for ETF's */}
                <Grid container className={classes.searchbar}>
                    <Grid xs={9}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search for an ETF...'
                            className={[classes.textWhite, classes.fullWidth, classes.searchInput].join(' ')}
                        />
                    </Grid>
                    <Grid xs={3} className={classes.searchButtonWrapper}>
                        <Button className={[classes.fullHeight, classes.searchButton].join(' ')} variant='contained' color='primary'>Search</Button>
                    </Grid>
                </Grid>

                <Divider/>

                <Button variant='contained' color='primary'>Click here 2</Button>
                <Divider/>

                <ol>
                    <li>China</li>
                    <li>Italy</li>
                    <li>Congo</li>
                </ol>
            </Grid>

            {/* map section */}
            <Grid item className={classes.width60}>
                {/* <Map lightMapSelected={false} className={classes.map}/> */}
            </Grid>
        </Grid>
    );
}

export default Sidebar;