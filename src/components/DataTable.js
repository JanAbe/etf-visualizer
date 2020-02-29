import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Box, Grid } from '@material-ui/core';


const createData = (security, amountInvested, percentage) => {
    return { security, amountInvested, percentage };
}

const rows = [
    createData('Alibaba Group Holding Ltd Sponsored ADR', '128.535.753,02', 5.9),
    createData('Tencent Holdings Ltd', '100.084.321,00', 4.6),
    createData('Taiwan Semiconductor Manufacturing Co Ltd', '96.843.850,90', 4.2),
    createData('Samsung Electronics Co Ltd', '82.173.731,73', 3.7),
    createData('China Construction Bank Corp Class H', '26.818.692,16', 1.3),
    createData('Naspers Ltd Class N', '26.459.042,22', 1.2),
    createData('Ping An Insurance Group Co of China Ltd', '23.179.604,66', 1.1)
]

const DataTable = ({ expanded }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Security
                                </TableCell>
                                {expanded && 
                                    <TableCell align="center">
                                        Amount Invested 
                                    </TableCell>
                                }
                                <TableCell align="center">
                                    % of Total Net Assets
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow>
                                    <TableCell>
                                        <div>
                                            <Box textOverflow="ellipsis" overflow="hidden">
                                                {/* todo: when hovering with mouse over a row, enlarge that row and show the full name */}
                                                {row.security}
                                            </Box>
                                        </div>
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