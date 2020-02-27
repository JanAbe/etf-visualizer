import React from 'react';
import Layout from './Layout';
import Map from './Map';
import Sidebar from './Sidebar';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const App = () => {
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                <Sidebar />
                <Map prefersDarkMode={prefersDarkMode} />
            </Layout>
        </ThemeProvider>
    );
}

export default App;