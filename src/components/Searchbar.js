import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    searchForm: {
        display: 'flex',
        alignItems: 'center',

        marginTop: '10%',
        marginBottom: '10%'
    },
    searchField: {
        paddingRight: '5px'
    },
    searchButton: {
        width: '100%',
        height: '40px'
    }
}));

const Searchbar = () => {
    const classes = useStyles();

    return (
        <form autoComplete="off" className={classes.searchForm}>
            <Grid item xs={9}>
                <TextField variant="outlined" label="Search for an ETF" type="search" margin="dense" fullWidth className={classes.searchField}/>
            </Grid>
            <Grid item xs={3}>
                <Button variant='contained' className={classes.searchButton}>
                    Search
                </Button>
            </Grid>
        </form>
        // <Grid container className={[classes.searchbar ].join(' ')}>
        //     <Grid item xs={9}>
        //         <InputBase
        //             placeholder='Search for an ETF...'
        //             className={[classes.searchInput].join(' ')}
        //         />
        //     </Grid>
        //     <Grid item xs={3} className={classes.searchButtonWrapper}>
        //         <Button className={[classes.searchButton].join(' ')} variant='contained'>
        //             Search
        //         </Button>
        //     </Grid>
        // </Grid>
    );
}

export default Searchbar;