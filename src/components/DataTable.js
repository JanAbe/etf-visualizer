import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid } from '@material-ui/core';

const DataTable = ({ data, expanded }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <TableContainer>
                    <Table size="small">
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
                                        Amount Invested 
                                    </TableCell>
                                }
                                <TableCell align="center">
                                    % of Total
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => (
                                <TableRow>
                                    <TableCell>
                                        {row.ticker}
                                    </TableCell>
                                    <TableCell>
                                        {/* todo: when hovering with mouse over a row, enlarge that row and show the full name */}
                                        {row.security}
                                    </TableCell>
                                    {expanded &&
                                        <TableCell align="center">
                                            ${row.amountInvested}
                                        </TableCell>
                                    }
                                    <TableCell align="center">
                                        {row.percentage}%
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