import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    dataTable: {
        overflowX: 'auto',
        whiteSpace: 'nowrap',

    },
    '@global': {
        [theme.breakpoints.down('sm')]: {
            'table.makeStyles-dataTable-209 thead': {
                display: 'none'
            },
            'table.makeStyles-dataTable-209 td:nth-child(1)': {
            },
            'table.makeStyles-dataTable-209 td:nth-child(1):before': {
                content: '"Ticker"'
            },
            'table.makeStyles-dataTable-209 td:nth-child(2):before': {
                content: '"Security"'
            },
            'table.makeStyles-dataTable-209 td:nth-child(3):before': {
                content: '"Market Value"'
            },
            'table.makeStyles-dataTable-209 td:nth-child(4):before': {
                content: '"% of Net Assets"',
            },
            'table.makeStyles-dataTable-209 td:nth-child(1), table.makeStyles-dataTable-209 td:nth-child(2), table.makeStyles-dataTable-209 td:nth-child(3), table.makeStyles-dataTable-209 td:nth-child(4)': {
                paddingLeft: '25%'
            },
            'table.makeStyles-dataTable-209 td:nth-child(1):before, table.makeStyles-dataTable-209 td:nth-child(2):before, table.makeStyles-dataTable-209 td:nth-child(3):before, table.makeStyles-dataTable-209 td:nth-child(4):before': {
                position: 'absolute',
                left: '0.5em',
                fontWeight: 'bold'
            },
            'table.makeStyles-dataTable-209 tr, table.makeStyles-dataTable-209 td': {
                textAlign: 'center',
                display: 'block'
            },
            'table.makeStyles-dataTable-209 tr': {
                position: 'relative',
                marginBottom: '1em',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: theme.transitions.create('box-shadow'),
                borderRadius: theme.shape.borderRadius,
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
                // boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
            },
            'table.makeStyles-dataTable-209 tr td:last-child': {
                borderBottom: 'none'
            }
        },
        [theme.breakpoints.up('lg')]: {
            'table.makeStyles-dataTable-209 tr:last-child td': {
                borderBottom: 'none'
            }
        }
    }
}));

const keysort = (key) => {
    return (a, b) => {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
        return 0;
    }
}

// todo: write code, to sum up all weight's from the sortedGroupData
// so i get the countries sorted on weight 
// const getCountriesAsc = (data) => {
//     const groupedData = _.groupBy(data, d => d.Location);
//     const sortedGroupedData = Object.entries(groupedData).sort(keysort('Weight'));
//     const x = _.sumBy(sortedGroupedData, (obj) => {
//         return _.sum(Number(obj[1].Weight));
//     });

//     console.log(x);
// } 

const DataTable = ({ data, expanded }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        // <Paper>
            <Grid container className={isSmallScreen ? "" : "MuiPaper-root MuiPaper-rounded MuiPaper-elevation1"}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table className={classes.dataTable}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Ticker
                                    </TableCell>
                                    <TableCell>
                                        Security
                                    </TableCell>
                                    {expanded && 
                                        <TableCell align="center">
                                            Market Value
                                        </TableCell>
                                    }
                                    <TableCell align="center">
                                        % of Total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {getCountriesAsc(data)} */}
                                {data.slice(0, 10).map(row => (
                                    <TableRow hover key={row['Ticker']}>
                                        <TableCell>
                                            {row['Ticker']}
                                        </TableCell>
                                        <TableCell>
                                            {row['Name']}
                                        </TableCell>
                                        {expanded &&
                                            <TableCell align="center">
                                                ${row['Market Value']}
                                            </TableCell>
                                        }
                                        <TableCell align="center">
                                            {row['Weight']}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        // </Paper>
    );
}

export default DataTable;