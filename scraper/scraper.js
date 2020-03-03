const readline = require('readline');
const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');

/*
todo:
probably add a sleeper mechanism to yahoo finance won't
block the scraper.

test if it works with e.g 10 company names

add code to deal with possible errors.
what happens if there is no data, 
or if the html markup is different

*/



/* 	
	main takes a path to a file
	containing rows of company names.
	For each row it calls the getCompanyInfo method
*/
const main = (filePath) => {
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

	const address = addressParts.join(', ').trim();
	return address;
}

const symbolLookupURL = (companyName) => {
	return `https://finance.yahoo.com/lookup?s=${companyName}`;
}

const profileURL = (symbol) => {
	return `https://finance.yahoo.com/quote/${symbol}/profile?p=${symbol}`;
}

main('%PUBLIC_URL%/../scraper/test.txt');