const mbxGeo = require('@mapbox/mapbox-sdk/services/geocoding');

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';
const geocodingClient = mbxGeo({ accessToken: MAPBOX_TOKEN });


geocodingClient.forwardGeocode({
	query: 'Russian Federation',
	limit: 1	
})
.send()
.then(response => {
	const match = response.body;
	console.log(match.features[0].geometry);
});