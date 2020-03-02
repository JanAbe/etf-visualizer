const readline = require('readline');
const fs = require('fs');
const axios = require('axios').default;

const getSymbolAndCompanyInfo = (filePath) => {
	const lineReader = readline.createInterface({
		input: fs.createReadStream(filePath)
	});

	lineReader.on('line', (line) => {
		getCompanyInfo(line)
		.then(data => {
			console.log(data);
		})
		.catch(err => {
			console.error(err);
		})
	});
}

const getCompanyInfo = async (companyName) => {
	try {
		const symbolResponse = await axios.get(symbolLookupURL(companyName));
		const symbol = getSymbolFromResponse(symbolResponse);
		const companyProfileResponse = await axios.get(profileURL(symbol));
		const companyInfo = getCompanyInfoFromResponse(companyProfileResponse);
		return companyInfo;
	} catch (err) {
		console.error(err);
	}
}

const getSymbolFromResponse = (response) => {
	// can look for: <tbody reactid="54"
	// this is the table body which contains the rows with the suggestions of the symbols that can correspond to the companyName
	return '';
}

const getCompanyInfoFromResponse = (response) => {
	// street, city, country
	return '';
}

const symbolLookupURL = (companyName) => {
	return `https://finance.yahoo.com/lookup?s=${companyName}`;
}

const profileURL = (symbol) => {
	return `https://finance.yahoo.com/quote/${symbol}/profile?p=${symbol}`;
}

getSymbolAndCompanyInfo('%PUBLIC_URL%/../scraper/test.txt');