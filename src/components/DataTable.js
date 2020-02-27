import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Box, Grid, fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const DataTable = () => {
    const classes = useStyles();
    return (
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default DataTable;