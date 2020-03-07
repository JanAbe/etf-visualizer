import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    dataTable: {
        overflowX: 'auto',
        whiteSpace: 'nowrap'
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

    return (
        <Paper>
            <Grid container>
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
                                {getCountriesAsc(data)}
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
        </Paper>
    );
}

export default DataTable;