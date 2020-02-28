import React from 'react';
import ReactMapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { HexagonLayer } from 'deck.gl';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';

// Viewport settings
// const viewState = {
//     latitude: 18.022672,
//     longitude: 19.188889,
//     zoom: 1.92,
//     minZoom: 1.72,
//     pitch: 35,
//     bearing: 0
// };
const INITIAL_VIEW_STATE = {
    longitude: -1.4157267858730052,
    latitude: 52.232395363869415,
    zoom: 6.6,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40.5,
    bearing: -27.396674584323023
};

const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];
  
class Map extends React.Component {
    static get defaultColorRange() {
        return colorRange;
    }

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 38.022672,
                longitude: 9.188889,
                zoom: 1.52,
            },
        };
    }

    onViewportChange = viewport => {
        this.setState({viewport: viewport});
    }

    _renderLayers() {
        const { data } = this.props;

        return [
            new HexagonLayer({
                id: 'hexagon-layer',
                data,
                pickable: true,
                extruded: true,
                colorRange,
                elevationScale: 250,
                elevationRange: [0, 3000],
                elevationLowerPercentile: 0,
                getPosition: d => d,
                opacity: 1
            })
        ];
    }

    render() {
        const prefersDarkMode = this.props.prefersDarkMode;
        const darkMapURL = 'mapbox://styles/mapbox/dark-v10';
        const expanded = this.props.expanded;
        const defaultWidth = '80%';
        const expandedWidth = '60%';
        const transitionSettings = 'width 0.8s';

        return (
            <ReactMapGL
                style={{transition: transitionSettings}}
                height='100%'
                width={expanded ? expandedWidth : defaultWidth}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                disableTokenWarning={true}
            >
                <DeckGL  // todo: find out how to get light and darkthemes of the deckGL/staticMap 
                    // initialViewState={viewState} 
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={true}
                    layers={this._renderLayers()}
                >
                    {prefersDarkMode ? (
                        <StaticMap mapStyle={darkMapURL} mapboxApiAccessToken={MAPBOX_TOKEN} 
                        
                        />
                    ) : (
                        <StaticMap 
                            mapboxApiAccessToken={MAPBOX_TOKEN} 
                            reuseMaps 
                            preventStyleDiffing={true}
                        />
                    )}
                </DeckGL>
            </ReactMapGL>
        );
    }
}

export default Map;