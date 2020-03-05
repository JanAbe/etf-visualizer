const readline = require('readline');
const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');
const csv = require('csvtojson');
const mbxGeo = require('@mapbox/mapbox-sdk/services/geocoding');
const countries = require("i18n-iso-countries");

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


// create a json file based on the csv file
// goes from iemg_holdings.csv to data.json for example
const csvToJSON = (csvPath, jsonPath) => {
	const readStream = fs.createReadStream(csvPath);
	const writeStream = fs.createWriteStream(jsonPath);
	readStream.pipe(csv()).pipe(writeStream);
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
		getCompanyInfoFromName(line.trim())
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

const symbolLookupURL = (companyName) => {
	// maybe this url is better `https://www.marketwatch.com/tools/quotes/lookup.asp?siteID=mktw&Lookup=${security}&Country=all&Type=All`;
	// but need to add new scraping code if this is used
	return `https://finance.yahoo.com/lookup?s=${companyName}`;
}

const profileURL = (symbol) => {
	// maybe this url is better `https://www.marketwatch.com/investing/stock/${symbol}/profile`; 
	// but need to add new scraping code if this is used
	// can maybe add like a more generic function called scrape
	// that takes a url and a function as input
	// scrap(url, func)
	return `https://finance.yahoo.com/quote/${symbol}/profile?p=${symbol}`;
}

/*
	getCompanyInfoFromName looks up the symbol that corresponds with the provided
	company name. Then it uses this symbol to fetch info about the company, such as address data.
*/
const getCompanyInfoFromName = async (companyName) => {
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

/*
	getCompanyInfoFromSymbol uses the provided symbol to fetch info about the company, such as address data.
*/
const getCompanyInfoFromSymbol = async (symbol) => {
	try {
		const companyProfileResponse = await axios.get(profileURL(symbol));
		const companyInfo = getCompanyInfoFromResponse(companyProfileResponse);
		return companyInfo;
	} catch (err) {
		console.error(err);
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

	// if it consists of 4 parts, remove the second part
	// this is often times a district, which messes up the results from mapbox.geoForwarding.
	if (addressParts.length === 4) {
		addressParts.splice(1, 1)
	}

	addressParts.splice(addressParts.length-1, 1); // remove the last section, which is the country section. This data is already present.
	const address = addressParts.join(', ').trim();
	return address;
}

// uses mapbox geocoding client to get the coordinates
// that correspond to the location.
// e.g. location='China' returns [103, 35]
const getCoordinatesFromLocation = async (location, country) => {
	let coordinates = [];

	if (!location) {
		const response = await geocodingClient.forwardGeocode({
			query: country,
			limit: 1,
		})
		.send()
		
		// because we are only interested in the first result,
		// the result that has the highest chance of being the coordinates we want,
		// get the first result only.
		const features = response.body.features[0];
		if (!features) {
			console.log('no coords found for: ' + location);
			return '';
		}

		coordinates = features.geometry.coordinates;
	} else {
		const response = await geocodingClient.forwardGeocode({
			query: location,
			countries: [countries.getAlpha2Code(country, 'en').toLowerCase()],
			limit: 1,
		})
		.send()
		
		// because we are only interested in the first result,
		// the result that has the highest chance of being the coordinates we want,
		// get the first result only.
		const features = response.body.features[0];
		if (!features) {
			console.log('no coords found for: ' + location);
			return '';
		}

		coordinates = features.geometry.coordinates;
	}

	return coordinates;
}

// adds coordinates to the json file
// parse the existing json data,
// iterate over each object,
// get the coordinates for this object based on
// the location key's value,
// add a new key called Coordinates,
const addCoordinates = (jsonPath) => {
	fs.readFile(jsonPath, async (err, data) => {
		if (err) console.log(err);

		const json = JSON.parse(data);

		try {
			for (const obj of json) {
				const address = await getCompanyInfoFromSymbol(obj.Ticker);
				const coords = await getCoordinatesFromLocation(address, obj.Location); // location in the json file is a country
				obj['Coordinates'] = coords;
			}
		} catch (e) {
			console.log(e);
		}

		fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
			if (err) console.log(err);
		})
	})
}

// main('%PUBLIC_URL%/../scraper/results1.txt', '%PUBLIC_URL%/../scraper/holdings.txt');
// csvToJSON('%PUBLIC_URL%/../data/IEMG_holdings.csv', '%PUBLIC_URL%/data.json');
addCoordinates('%PUBLIC_URL%/../data/data.json');