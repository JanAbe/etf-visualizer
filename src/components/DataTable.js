import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Box, Grid, fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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

const DataTable = () => {
    const classes = useStyles();
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
                                <TableCell align="right">
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
                                    <TableCell align="right">
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