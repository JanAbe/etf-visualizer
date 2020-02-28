import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Map from './Map';
import Sidebar from './Sidebar';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';


const App = () =>  {
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

    const [expanded, setExpanded] = useState(false); 

    const handleExpandButtonClick = () => {
        setExpanded(!expanded)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                <Sidebar expanded={expanded} expandAction={handleExpandButtonClick} />
                {/* <Map prefersDarkMode={prefersDarkMode} expanded={expanded} /> */}
                <div style={{backgroundColor: 'pink', width: '80%'}}>
                    
                </div>
            </Layout>
        </ThemeProvider>
    );
}

export default App;