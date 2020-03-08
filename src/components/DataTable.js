import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    dataTable: {
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    },
    '@global': {
        [theme.breakpoints.down('750')]: {
            '#dataTableETF thead': {
                display: 'none'
            },
            '#dataTableETF th, #dataTableETF td': {
                padding: '1.0em'
            },
            '#dataTableETF td:nth-child(1)': {
            },
            '#dataTableETF td:nth-child(1):before': {
                content: '"Country"'
            },
            '#dataTableETF td:nth-child(2):before': {
                content: '"Security"',
            },
            '#dataTableETF td:nth-child(3):before': {
                content: '"Market Value"'
            },
            '#dataTableETF td:nth-child(4):before': {
                content: '"Percentage of Net Assets"',
            },
            '#dataTableETF td:nth-child(1), #dataTableETF td:nth-child(2), #dataTableETF td:nth-child(3), #dataTableETF td:nth-child(4)': {
                paddingLeft: '30%'
            },
            '#dataTableETF td:nth-child(1):before, #dataTableETF td:nth-child(2):before, #dataTableETF td:nth-child(3):before, #dataTableETF td:nth-child(4):before': {
                position: 'absolute',
                left: '1.5em',
                fontWeight: 'bold'
            },
            '#dataTableETF tr, #dataTableETF td': {
                textAlign: 'end',
                display: 'block',
            },
            '#dataTableETF td': {
                whiteSpace: 'initial'
            },
            '#dataTableETF tr': {
                position: 'relative',
                marginBottom: '1em',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: theme.transitions.create('box-shadow'),
                borderRadius: theme.shape.borderRadius,
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
            },
            '#dataTableETF tr td:last-child': {
                borderBottom: 'none'
            }
        },
        [theme.breakpoints.up('lg')]: {
            '#dataTableETF tr:last-child td': {
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

const DataTable = ({ data }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('750'));

    return (
        <Grid container className={isSmallScreen ? "" : "MuiPaper-root MuiPaper-rounded MuiPaper-elevation1"}>
            <Grid item xs={12}>
                <TableContainer>
                    <Table id="dataTableETF" className={classes.dataTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Country
                                </TableCell>
                                <TableCell>
                                    Security
                                </TableCell>
                                <TableCell align="center">
                                    Market Value
                                </TableCell>
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
                                        {row['Location']}
                                    </TableCell>
                                    <TableCell>
                                        {row['Name']}
                                    </TableCell>
                                    <TableCell align="center">
                                        ${row['Market Value']}
                                    </TableCell>
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
    );
}

export default DataTable;