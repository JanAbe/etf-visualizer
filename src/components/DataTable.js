import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Tooltip, TablePagination, Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    dataTable: {
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    },
    tooltip: {
        paddingLeft: '0.2em'
    },
    paginationWrapper: {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',

        [theme.breakpoints.down('750')]: {
            flexDirection: 'column-reverse',
        }
    },
    caption: {
        paddingLeft: '1em',
        opacity: '0.7'
    },
    '@global': {
        [theme.breakpoints.down('750')]: {
            '#dataTableETF thead': {
                display: 'none'
            },
            '#dataTableETF th, #dataTableETF td': {
                padding: '1.0em'
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
        }
    }
}));

const DataTable = ({ data, expanded }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('750'));
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(9);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const renderPagination = () => {
        if (expanded) {
            return (
                <div className={classes.paginationWrapper}>
                    <p className={classes.caption}>Data of the holdings of the ETF</p>
                    <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[7]}
                        page={page}
                        onChangePage={handleChangePage} />
                </div>
            )
        }
        return (
            <div className={classes.paginationWrapper} style={{flexDirection: 'column'}}>
                <p className={classes.caption}>Data of the holdings of the ETF</p>
            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[7]}
                page={page}
                onChangePage={handleChangePage} />
            </div>
        )
    }

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
                                    <Tooltip className={classes.tooltip} arrow title="The name of the stock they invested in" placement="top">
                                        <InfoIcon fontSize="small"></InfoIcon>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    Market Value
                                    <Tooltip className={classes.tooltip} arrow title="Amount of money invested in this security" placement="top">
                                        <InfoIcon fontSize="small"></InfoIcon>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    % of Total
                                    <Tooltip className={classes.tooltip} arrow title="What percentage of the net assets is invested in this security" placement="top">
                                        <InfoIcon fontSize="small"></InfoIcon>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
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
                { renderPagination() }
            </Grid>
        </Grid>
    );
}

export default DataTable;