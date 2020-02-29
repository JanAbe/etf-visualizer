import React from 'react';
import ReactMapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { HexagonLayer, AmbientLight, PointLight, LightingEffect } from 'deck.gl';

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';

// Viewport settings
const viewState = {
    latitude: 18.022672,
    longitude: 19.188889,
    zoom: 1.92,
    minZoom: 1.72,
    pitch: 8,
    bearing: 0
};

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
});

const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51]
};

// colours of the pillars
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
                extruded: true,
                colorRange,
                elevationScale: 300,
                elevationRange: [0, 3000],
                elevationLowerPercentile: 0,
                getPosition: d => d,
                opacity: 1,
                material,
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
                    initialViewState={viewState} 
                    controller={true}
                    layers={this._renderLayers()}
                    effects={[lightingEffect]} // makes the lighting on the pillars different (adds a shade to the top of the pillars or something)
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