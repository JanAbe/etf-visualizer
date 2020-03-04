import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'; 
import DataTable from './DataTable';
import Searchbar from './Searchbar';
import SubHeader from './SubHeader';
import MenuHeader from './MenuHeader';
import GeneralInfo from './GeneralInfo';

const useStyles = makeStyles(theme => ({
    sidebar: {
        paddingLeft: '2em',
        paddingRight: '2em',
        boxShadow: '5px 1px 10px 0px rgba(50, 50, 50, 0.3)',
        zIndex: 1,
        transition: 'width 0.3s'
    },
    defaultWidth: {
        width: '20%'
    },
    expandedWidth: {
        width: '40%',
    }
}));

const createData = (ticker, security, amountInvested, percentage) => {
    return { ticker, security, amountInvested, percentage };
}

const rows = [
    createData('BABA', 'Alibaba Group Holding Ltd Sponsored ADR', '128.535.753,02', 5.9),
    createData('TCY', 'Tencent Holdings Ltd', '100.084.321,00', 4.6),
    createData('TSM', 'Taiwan Semiconductor Manufacturing Co Ltd', '96.843.850,90', 4.2),
    createData('SAM', 'Samsung Electronics Co Ltd', '82.173.731,73', 3.7),
    createData('CCB', 'China Construction Bank Corp Class H', '26.818.692,16', 1.3),
    createData('NASP', 'Naspers Ltd Class N', '26.459.042,22', 1.2),
    createData('PNG', 'Ping An Insurance Group Co of China Ltd', '23.179.604,66', 1.1)
]


const Sidebar = ({ expanded, expandAction }) => {
    const classes = useStyles();

    return (
        <Grid className={[classes.sidebar, expanded ? classes.expandedWidth : classes.defaultWidth].join(' ')}>
            <MenuHeader expanded={expanded} expandAction={expandAction} />
            <SubHeader />
            <Divider />
            <GeneralInfo />
            {/* <Searchbar /> */}
            <DataTable data={rows} expanded={expanded} />
        </Grid>
    );
}

export default Sidebar;