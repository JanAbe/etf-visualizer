import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import _ from 'lodash';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    dataTable: {
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    },
    tooltip: {
        paddingLeft: '0.2em'
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
        },
        '#dataTableETF thead tr': {
            cursor: 'default'
        },
        '#dataTableETF tr': {
            cursor: 'pointer'
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
    const dispatch = useDispatch();

    const handleRowClick = (coordinates) => {
        dispatch(actions.setViewportState({
            longitude: coordinates[0],
            latitude: coordinates[1],
            zoom: 5
        }));
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
                                    <Tooltip className={classes.tooltip} arrow title="How much money they invested in this security" placement="top">
                                        <InfoIcon fontSize="small"></InfoIcon>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    % of Total
                                    <Tooltip className={classes.tooltip} arrow title="What percentage of their net assets they invested in this security" placement="top">
                                        <InfoIcon fontSize="small"></InfoIcon>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {getCountriesAsc(data)} */}
                            {data.slice(0, 10).map(row => (
                                <TableRow hover key={row['Ticker']} onClick={() => handleRowClick(row['Coordinates'])}>
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