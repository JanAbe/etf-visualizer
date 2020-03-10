import React, { useState, useEffect } from 'react';
import ReactMapGL, { StaticMap, FlyToInterpolator } from 'react-map-gl';
import DeckGL, { HeatmapLayer } from 'deck.gl';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors'

// todo: remove this, place in config file, or in env variable.
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';
  
const Map = (props) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const prefersDarkMode = props.prefersDarkMode;
    // const [viewport, setViewport] = useState({
    //     latitude: 18.022672,
    //     longitude: 19.188889,
    //     zoom: 1.92,
    //     pitch: 8,
    //     bearing: 0
    // });
    const viewport = useSelector(selectors.selectViewport);
    const dispatch = useDispatch();

    // Renders the heatMapLayer on top of the map
    const renderLayers = () => {
        const {data = props.dataSource, intensity = 2, threshold = 0.01, radiusPixels = 30, opacity = 0.75} = props;

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

    // returns a dark map if the user is using a dark theme,
    // returns a light theme otherwise
    const renderMap = (prefersDarkMode) => {
        if (prefersDarkMode) {
            const darkMapURL = 'mapbox://styles/mapbox/dark-v10';
            return (
                <StaticMap 
                    mapStyle={darkMapURL} 
                    mapboxApiAccessToken={MAPBOX_TOKEN} 
                    reuseMaps 
                    preventStyleDiffing={true}
                />
            );
        }

        return (
            <StaticMap 
                mapboxApiAccessToken={MAPBOX_TOKEN} 
                reuseMaps 
                preventStyleDiffing={true}
            />
        );
    }

    // returns the correct width based on the screen size of the user
    // and if the sidebar has been expanded or not
    const getWidth = () => {
        const fullWidth = '100%';
        if (isSmallScreen) {
            return fullWidth;
        }

        const expanded = props.expanded;
        const defaultWidth = '80%';
        const expandedWidth = '60%';
        return expanded ? expandedWidth : defaultWidth;
    }

    const onViewportChanged = viewport => {
        dispatch(actions.setViewportState(viewport))
    }

    // flies to the provided coords
    // const onFlyTo = (lng, lat) => {
    //     const newViewport = {
    //         bearing: 0,
    //         pitch: 8,
    //         longitude: lng,
    //         latitude: lat,
    //         zoom: 5,
    //         transitionDuration: 3000,
    //         transitionInterpolator: new FlyToInterpolator()
    //     }
    //     setViewport(newViewport);
    // }

    // renders the complete map, with the layers and all
    const renderCompleteMap = () => {
        const transitionSettings = 'width 0.3s';

        return (
            <>
            <ReactMapGL
                style={{transition: transitionSettings}}
                height='100%'
                width={getWidth()}
                disableTokenWarning={true}
                {...viewport}
                onViewportChange={onViewportChanged}
                mapboxApiAccessToken={MAPBOX_TOKEN} 
                reuseMaps 
                preventStyleDiffing={true}
            >
                <DeckGL
                    viewState={viewport}
                    initialViewState={viewport} 
                    onViewportChange={onViewportChanged}
                    controller={true}
                    layers={renderLayers()}
                    disableTokenWarning={true}
                >
                    { renderMap(prefersDarkMode) }
                </DeckGL>
            </ReactMapGL>
            </>
        )
    }
    
    return (
        <>
        { renderCompleteMap() }
        </>
    );
}

export default Map;