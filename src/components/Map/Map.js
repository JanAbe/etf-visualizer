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

    setTooltip = (object, x, y) => {
        // object doesn't contain any data. How do i access the data from the hovered 
        const el = document.getElementById('tooltip');
        if (object) {
            el.innerHTML = object.security;
            el.style.display = 'block';
            el.style.left = x + 'px';
            el.style.top = y + 'px';
        } else {
            el.style.display = 'none';
        }
    }

    _renderTooltip() {
        const {hoveredObject, pointerX, pointerY} = this.state || {};
        console.log(hoveredObject);
        return hoveredObject && (
            <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
                { hoveredObject.message }
            </div>
        );
    }

    // Renders the heatMapLayer on top of the map
    _renderLayers() {
        const {data = this.props.data, intensity = 1, threshold = 0.03, radiusPixels = 30} = this.props;

        return [
            new HeatmapLayer({
                id: 'etf-visualizer-map',
                data,
                getPosition: d => [d['Coordinates'][0], d['Coordinates'][1]],
                getWeight: d => Number(d['Weight']),
                radiusPixels,
                intensity,
                threshold,
                pickable: true,
                onHover: info => this.setState({
                    hoveredObject: info.object,
                    pointerX: info.x,
                    pointerY: info.y
                })
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
                    { this._renderTooltip() }
                </DeckGL>
            </ReactMapGL>
        );
    }
}

export default Map;