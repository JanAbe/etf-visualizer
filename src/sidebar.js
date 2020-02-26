import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Button, Table, TablePagination, TableHead, TableRow, TableCell, TableContainer, TableBody, fade, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'; 
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
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
        borderRadius: theme.shape.borderRadius,
        marginBottom: '10px',
    },
    searchInput: {
        padding: theme.spacing(0.6, 2.0, 0.6, 1.5),
        backgroundColor: fade(theme.palette.common.white, 0.11),
        borderRadius: '4px 0px 0px 4px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
    },
    searchButton: {
        height: '100%',
        fontSize: '13px',
        borderRadius: '0px 4px 4px 0px',
        backgroundColor: fade(theme.palette.common.white, 0.18),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    searchButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    noPaddingLeft: {
        paddingLeft: 0
    },
    noPaddingRight: {
        paddingRight: 0
    },
    titleSection: {
        width: '100%'
    },
    expandIcon: {
        fontSize: '0.875rem'
    },
    expandButton: {
        borderRadius: '20px',
        minWidth: '30px',
        padding: theme.spacing(0, 0, 0, 0),
        height: '25%',
        backgroundColor: 'rgba(255, 255, 255, 0.24)',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.45),
        },
        marginTop: '5px',
        marginRight: '5px',
    },
    expandButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
}));

const createData = (security, percentage) => {
    return { security, percentage };
}

const rows = [
    createData('Alibaba Group Holding Ltd.', 5.9),
    createData('Tencent Holdings Ltd.', 4.6),
    createData('Taiwan Semiconductor Manufacturing Co. Ltd.', 4.2),
    createData('China Construction Bank Corp.', 1.2),
    createData('Naspers Ltd.', 1.2),
    createData('Ping An Insurance Group Co. of China Ltd.', 1.2),
    createData('Reliance Industries Ltd.', 1.0),
]

const Sidebar = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.fullHeight}>
            {/* sidebar section */}
            <Grid item className={[classes.width40, classes.dark, classes.centerText].join(' ')}>
                {/* Title section */}
                <Grid container className={classes.titleSection}>
                    <Grid item xs={10}>
                        <h2>ETF Visualizer</h2>
                        <h5>Search. Select. Visualize.</h5>
                    </Grid>
                    <Grid item xs={2} className={classes.expandButtonWrapper}>
                        <Tooltip title="Expand" placement="right">
                            <Button variant='contained' className={[classes.expandButton, classes.textWhite].join(' ')}>
                                <ArrowForwardIosIcon className={classes.expandIcon} />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>

                {/* General ETF Info section */}
                <Grid>
                    <div>
                        ${5_256_365_000} invested
                    </div>
                    <div>
                        Visit the ETF's website
                    </div>
                </Grid>

                {/* Searchbar for ETF's */}
                <Grid container className={[classes.paddingHorizontal, classes.searchbar ].join(' ')}>
                    <Grid item xs={9}>
                        <InputBase
                            placeholder='Search for an ETF...'
                            className={[classes.textWhite, classes.searchInput, classes.fullWidth].join(' ')}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.searchButtonWrapper}>
                        <Button className={[classes.fullHeight, classes.searchButton].join(' ')} variant='contained' color='primary'>
                            Search
                        </Button>
                    </Grid>
                </Grid>

                {/* ETF data table */}
                <Grid container className={classes.paddingHorizontal}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={[classes.textWhite, classes.noPaddingRight].join(' ')}>
                                            Security
                                        </TableCell>
                                        <TableCell align="right" className={[classes.textWhite, classes.noPaddingLeft].join(' ')}>
                                            % of Total Net Assets
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow>
                                            <TableCell style={{width:'50%'}} className={[classes.textWhite, classes.noPaddingRight].join(' ')}>
                                                <div style={{width: 180, whiteSpace:"nowrap"}}>
                                                    <Box textOverflow="ellipsis" overflow="hidden">
                                                        {/* todo: when hovering with mouse over a row, enlarge that row and show the full name */}
                                                        {row.security}
                                                    </Box>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{width:'50%'}} className={[classes.textWhite, classes.centerText].join(' ')} align="right">
                                                {row.percentage}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {/* 
                                        todo:
                                        kijken naar de overflow, als een 'security' naam te lang is.
                                        kijken of ik boven deze tabel, en onder de searchbar een sectie 'Algemene informatie' kan maken:
                                            met daarin info zoals, totaal bedrag in $ ge"investeerd, datum van de data, link naar website van de ETF 
                                        kijken naar filter mogelijkheden van de tabel's data:
                                            filteren op percentage ge"investeerd (groot naar klein en vice versa)
                                            filteren op alphabetische volgorde
                                            filteren op land
                                        kijken hoe ik alle data wil laten zien, de tabel is namelijk super klein op het moment,
                                        omdat de ruimte in de sidebar beperkt is.
                                            misschien als je op een 'row' drukt, wordt meer informatie over dat bedrijf/security getoond
                                                maar waar? i.p.v de wereldkaart, of in de sidebar?
                                                of de sidebar vergroten van huide breedte (20%?) naar bijv. 40% als op 'toon meer info' wordt drukt
                                                of als op een 'row' wordt gedrukt.
                                        tooltips toevoegen aan de tableHeaders, uitleggen wat een security is en wat '% of total net assets betekend'
                                    */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>

            {/* map section */}
            <Grid item className={classes.width60}>
                {/* <Map className={classes.map}/> */}
            </Grid>
        </Grid>
    );
}

export default Sidebar;