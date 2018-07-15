import fetch from "node-fetch";

/*
	https://opencorporates.com/companies/us_de/3582691
 */


class OpenCorporatesAPI {

    getCompanyByName(searchTerm) {
        searchTerm = encodeURIComponent(searchTerm);
        const params = [
            `order=score`,
            `inactive=false`
        ].join('&');
        return fetch(`https://api.opencorporates.com/v0.4/companies/search?q=${searchTerm}&${params}`).then(body => body.json());
    }
}

export default OpenCorporatesAPI;