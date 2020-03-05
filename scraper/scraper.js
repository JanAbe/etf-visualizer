const readline = require('readline');
const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');
const csv = require('csvtojson');
const mbxGeo = require('@mapbox/mapbox-sdk/services/geocoding');
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2ludGVyLW1vb24iLCJhIjoiY2s2dXE1dHI1MGJsZDNma2hlbnI2Z3NvciJ9.3Fomq0bT2ITqqqvCCUi2dg';
const geocodingClient = mbxGeo({ accessToken: MAPBOX_TOKEN });

/*
todo:
probably add a sleeper mechanism to yahoo finance won't
block the scraper.

test if it works with e.g 10 company names

add code to deal with possible errors.
what happens if there is no data, 
or if the html markup is different

*/


const csvToJSON = (csvPath, jsonPath) => {
	const readStream = fs.createReadStream(csvPath);
	const writeStream = fs.createWriteStream(jsonPath);
	readStream.pipe(csv()).pipe(writeStream);
}

const getCoordinatesFromLocation = async (location) => {
	const response = await geocodingClient.forwardGeocode({
		query: location,
		limit: 1	
	})
	.send()

	const features = response.body.features[0];
	if (!features) {
		console.log('no coords found: ' + location);
		return '';
	}

	return features.geometry.coordinates;
}

const addCoordinates = (jsonPath) => {
	fs.readFile(jsonPath, async (err, data) => {
		if (err) console.log(err);

		const json = JSON.parse(data);

		for (const obj of json) {
			const coords = await getCoordinatesFromLocation(obj.Location);
			obj['Coordinates'] = coords;
		}

		fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
			if (err) console.log(err);
		})
	})
}

/* 	
	main takes a path to a file
	containing rows of company names.
	For each row it calls the getCompanyInfo method
*/
const main = (outPath, inPath) => {
	const lineReader = readline.createInterface({
		input: fs.createReadStream(inPath)
	});

	lineReader.on('line', (line) => {
		getCompanyInfo(line.trim())
		.then(data => {
			fs.appendFile(outPath, `${line}, address: ${data}\n`, (err) => {
				if (err) {
					console.log(err);
				}
			});
		})
		.catch(err => {
			console.error(err);
		})
	});
}

/*
	getCompanyInfo looks up the symbol that corresponds with the provided
	company name. Then it uses this symbol to fetch info about the company, such as address data.
*/
const getCompanyInfo = async (companyName) => {
	try {
		const symbolResponse = await axios.get(symbolLookupURL(companyName));
		const symbol = getSymbolFromResponse(symbolResponse);
		const companyProfileResponse = await axios.get(profileURL(symbol));
		const companyInfo = getCompanyInfoFromResponse(companyProfileResponse);
		return companyInfo;
	} catch (err) {
		// console.error(err);
	}
}

const getSymbolFromResponse = (response) => {
	const $ = cheerio.load(response.data);
	const symbol = $('table.lookup-table tbody tr a').first().text(); // the first row is used because this has the biggest chance of being the correct symbol
	return symbol;
}

const getCompanyInfoFromResponse = (response) => {
	let addressParts = [];
	const $ = cheerio.load(response.data);
	const companyInfoNodes = $('div.asset-profile-container div div p').first().contents();
	companyInfoNodes.each((i, el) => {
		if (el.type === 'text') {
			addressParts.push(el.data);
		};
	});

	if (addressParts.length === 4) {
		addressParts.splice(0, 1)
	}
	const address = addressParts.join(', ').trim();
	return address;
}

const symbolLookupURL = (companyName) => {
	return `https://finance.yahoo.com/lookup?s=${companyName}`;
}

const profileURL = (symbol) => {
	return `https://finance.yahoo.com/quote/${symbol}/profile?p=${symbol}`;
}

// main('%PUBLIC_URL%/../scraper/results1.txt', '%PUBLIC_URL%/../scraper/holdings.txt');
// csvToJSON('%PUBLIC_URL%/../data/IEMG_holdings.csv', '%PUBLIC_URL%/data.json');
addCoordinates('%PUBLIC_URL%/../data/data.json');