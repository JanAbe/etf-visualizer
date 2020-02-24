import React from 'react';
import ReactDOM from 'react-dom';
import ReactMapGL from 'react-map-gl';
import './index.css';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 400,
                height: 400,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8
            }
        };
    }

    render() {
        return (
            <ReactMapGL 
                mapboxApiAccessToken={MAPBOX_TOKEN}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport: viewport})}
            />
        );
    }
}

ReactDOM.render(<Map />, document.getElementById('root'));