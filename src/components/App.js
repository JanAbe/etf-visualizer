import React, { useState } from 'react';
import Layout from './Layout';
import Map from './Map/Map';
import Sidebar from './Sidebar';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import store from '../store/store';
import { Provider } from 'react-redux';

const App = ({ data, dataSource }) =>  {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Todo: learn to understand this piece of code
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    if (!prefersDarkMode) {
        theme.palette.text.primary = "#444";
    }

    const [expanded, setExpanded] = useState(true); 

    // handleExpandButtonClick toggles the expansion of the sidebar
    const handleExpandButtonClick = () => {
        setExpanded(!expanded)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Layout>
                    <Sidebar data={data} prefersDarkMode={prefersDarkMode} expanded={expanded} expandAction={handleExpandButtonClick} />
                    <Map prefersDarkMode={prefersDarkMode} expanded={expanded} dataSource={dataSource} />
                </Layout>
            </Provider>
        </ThemeProvider>
    );
}

export default App;