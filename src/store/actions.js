
export const SET_VIEWPORT_STATE = 'SET_VIEWPORT_STATE';
export const FLY = 'FLY';

export const setViewportState = viewport => ({
	type: SET_VIEWPORT_STATE,
	viewport
});

export const fly = (lng, lat, duration) => ({
	type: FLY,
	latitude: lat, 
	longitude: lng,
	duration: duration
})