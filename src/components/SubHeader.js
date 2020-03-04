import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    menuSubHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    subHeader: {
        textAlign: 'center',
        marginTop: '0px'
    },
    link: {
        textDecoration: 'none',
    }
}));


const SubHeader = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.menuSubHeaderWrapper}>
            <Grid item xs={11} >
                <p className={classes.subHeader}>
                    Visualize the
                    <Link className={classes.link} href="https://www.ishares.com/us/products/244050/ishares-core-msci-emerging-markets-etf"> iShares Core MSCI Emerging Markets ETF </Link>
                    as of <strong>03/03/2020</strong>
                </p>
            </Grid>
        </Grid>
    );
}

export default SubHeader;