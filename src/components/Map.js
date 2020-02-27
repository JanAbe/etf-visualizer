import React from 'react';
import MapGL from 'react-map-gl';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 38.022672,
                longitude: 9.188889,
                zoom: 1.52,
            }
        };
    }

    onViewportChange = viewport => {
        this.setState({viewport: viewport});
    }

    render() {
        const lightMapURL = 'mapbox://styles/mapbox/light-v10';
        const darkMapURL = 'mapbox://styles/mapbox/dark-v10';
        const prefersDarkMode = this.props.prefersDarkMode;

        return (
            <MapGL
                {...this.state.viewport}
                height='100%'
                width='100%'
                mapStyle={prefersDarkMode ? darkMapURL : lightMapURL}
                onViewportChange={this.onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            />
        );
    }
}

export default Map;