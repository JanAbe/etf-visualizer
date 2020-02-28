import React from 'react';
import ReactMapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { LineLayer } from 'deck.gl';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';

const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];
// Viewport settings
const viewState = {
    latitude: 38.022672,
    longitude: 9.188889,
    zoom: 1.52,
    pitch: 0,
    bearing: 0
  };


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
        const expanded = this.props.expanded;
        const defaultWidth = '80%';
        const expandedWidth = '60%';
        const transitionSettings = 'width 0.8s';

        // return (
        //     <ReactMapGL
        //         style={{transition: transitionSettings}}
        //         {...this.state.viewport}
        //         height='100%'
        //         width={expanded ? expandedWidth : defaultWidth}
        //         mapStyle={prefersDarkMode ? darkMapURL : lightMapURL}
        //         onViewportChange={this.onViewportChange}
        //         mapboxApiAccessToken={MAPBOX_TOKEN}
        //     />
        // );

        const layers = [
            new LineLayer({id: 'line-layer', data})
        ];

        return (
            <ReactMapGL
                style={{transition: transitionSettings}}
                height='100%'
                width={expanded ? expandedWidth : defaultWidth}
                disableTokenWarning={true}
            >
                <DeckGL  // todo: find out how to get light and darkthemes of the deckGL/staticMap 
                    initialViewState={viewState} 
                    controller={true}
                    layers={layers} 
                    
                >
                    {prefersDarkMode ? (
                        <StaticMap mapStyle={darkMapURL} mapboxApiAccessToken={MAPBOX_TOKEN} />
                    ) : (
                        <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
                    )}
                </DeckGL>
            </ReactMapGL>
        );
    }
}

export default Map;