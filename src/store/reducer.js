import * as actions from './actions';

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
		default:
			return state
	}
}