import React from 'react';
import ReactMapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { HeatmapLayer } from 'deck.gl';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';
  
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 18.022672,
                longitude: 19.188889,
                zoom: 1.92,
                minZoom: 1.72,
                pitch: 8,
                bearing: 0
            },
        };
    }

    onViewportChange = viewport => {
        this.setState({viewport: viewport});
    }

    // Renders the heatMapLayer on top of the map
    _renderLayers() {
        const {data = this.props.dataSource, intensity = 2, threshold = 0.01, radiusPixels = 30, opacity=0.75} = this.props;
        const prefersDarkMode = this.props.prefersDarkMode;

        const colorRangeDark= [
            [217, 240, 163],
            [173, 221, 142],
            [120, 198, 121],
            [49, 163, 84],
            [0, 104, 55],
            [0, 51, 0]
        ];

        const colorRangeLight = [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
        ];

        const colorRange = prefersDarkMode ? colorRangeDark : colorRangeLight;

        return [
            new HeatmapLayer({
                id: 'etf-visualizer-map',
                data,
                colorRange,
                getPosition: d => [d['Coordinates'][0], d['Coordinates'][1]],
                getWeight: d => Number(d['Weight']),
                radiusPixels,
                intensity,
                threshold,
                pickable: true,
                opacity,
            })
        ];
    }

    render() {
        const prefersDarkMode = this.props.prefersDarkMode;
        const darkMapURL = 'mapbox://styles/mapbox/dark-v10';
        const expanded = this.props.expanded;
        const defaultWidth = '80%';
        const expandedWidth = '60%';
        const transitionSettings = 'width 0.3s';

        return (
            <ReactMapGL
                style={{transition: transitionSettings}}
                height='100%'
                width={expanded ? expandedWidth : defaultWidth}
                disableTokenWarning={true}
            >
                <DeckGL
                    initialViewState={this.state.viewport} 
                    onViewportChange={this.onViewportChange}
                    controller={true}
                    layers={this._renderLayers()}
                >
                    {prefersDarkMode ? (
                        <StaticMap 
                            mapStyle={darkMapURL} 
                            mapboxApiAccessToken={MAPBOX_TOKEN} 
                            reuseMaps 
                            preventStyleDiffing={true}
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