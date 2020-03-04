import React from 'react';
import ReactMapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { HeatmapLayer } from 'deck.gl';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';
// const DATA_URL = './data.json';
  
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
        const {data = this.props.data, intensity = 1, threshold = 0.03, radiusPixels = 30} = this.props;

        return [
            new HeatmapLayer({
                id: 'heatmp-layer',
                data,
                pickable: true,
                getPosition: d => [d['coordinates'][0], d['coordinates'][1]],
                getWeight: d => Number(d['percentage']),
                radiusPixels,
                intensity,
                threshold,
              })
        ];
    }

    render() {
        const prefersDarkMode = this.props.prefersDarkMode;
        const darkMapURL = 'mapbox://styles/mapbox/dark-v10';
        const expanded = this.props.expanded;
        const defaultWidth = '80%';
        const expandedWidth = '60%';
        const transitionSettings = 'width 0.5s';

        return (
            <ReactMapGL
                style={{transition: transitionSettings}}
                height='100%'
                width={expanded ? expandedWidth : defaultWidth}
                disableTokenWarning={true}
            >
                <DeckGL  // todo: find out how to get light and darkthemes of the deckGL/staticMap 
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