import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Divider, Button, Table, TableHead, TableRow, TableCell, TableContainer, TableBody, fade } from '@material-ui/core';
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
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    searchButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    table: {
        // minWidth: 350,
    },
    noPaddingLeft: {
        paddingLeft: 0
    },
    noPaddingRight: {
        paddingRight: 0
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

                {/* ETF data table */}
                <TableContainer>
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={[classes.textWhite, classes.noPaddingRight].join(' ')}>Security</TableCell>
                                <TableCell align="right" className={[classes.textWhite, classes.noPaddingLeft].join(' ')}>% of Total Net Assets</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {/* 
                                    todo:
                                    kijken naar de overflow, als een 'security' naam te lang is.
                                    kijken of ik boven deze tabel, en onder de searchbar een sectie 'Algemene informatie' kan maken:
                                        met daarin info zoals, totaal bedrag in $ ge"investeerd, datum van de data 
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
                                <TableCell className={[classes.textWhite, classes.noPaddingRight].join(' ')}>Adr Alibaba Group Hldg</TableCell>
                                <TableCell className={[classes.textWhite, classes.centerText, classes.noPaddingLeft].join(' ')} align="right">5.9%</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* map section */}
            <Grid item className={classes.width60}>
                {/* <Map lightMapSelected={false} className={classes.map}/> */}
            </Grid>
        </Grid>
    );
}

export default Sidebar;