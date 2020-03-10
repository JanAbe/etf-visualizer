import * as actions from './actions';
import { FlyToInterpolator } from 'react-map-gl';

const initialViewport = {
	latitude: 18.022672,
	longitude: 19.188889,
	zoom: 1.92,
	pitch: 8,
	bearing: 0
}

const initialState = {
	viewport: initialViewport
}

export default (state=initialState, action) => {
	switch (action.type) {
		case actions.SET_VIEWPORT_STATE:
			return {
				...state,
				viewport: action.viewport
			}
		case actions.FLY: {
			return {
				...state,
				viewport: {
					zoom: 5,
					pitch: 8,
					bearing: 0,
					transitionInterpolator: new FlyToInterpolator(),
					transitionDuration: action.duration,
					latitude: action.latitude,
					longitude: action.longitude
				}
			}
		}
		default:
			return state
	}
}