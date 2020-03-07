import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dataTable: {
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    }
}));

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
                                {data.slice(0, 10).map(row => (
                                    <TableRow hover>
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