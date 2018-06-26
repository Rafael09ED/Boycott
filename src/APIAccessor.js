const wdk = require('wikidata-sdk');

const wikidataPropNameMap = {
    parentOrganization: 'P749',
    subsidiary: 'P355',
};
// https://query.wikidata.org

/*
    Accesses APIs for OpenCorporate and WikiData into a local format
    https://docs.google.com/document/d/1nkifpLDTKNVtRUXca9XQRhZG1BQGOh56egNUCwIhbdI/edit

 */
class APIAccessor {
    getCompanyByName_OpenCorporate(searchTerm) {
        searchTerm = encodeURIComponent(searchTerm);
        const params = [
            `order=score`,
            `inactive=false`
        ].join('&');
        return fetch(`https://api.opencorporates.com/v0.4/companies/search?q=${searchTerm}&${params}`);
    }

    wikidata_searchNames(searchTerm) {
        searchTerm = encodeURIComponent(searchTerm);
        const url = wdk.searchEntities({
            search: searchTerm
        });
        return fetch(url)
            .then(response => response.json())
            .then(this.wikidata_parseSearchIntoEntityObjects);
    }

    wikidata_parseSearchIntoEntityObjects(resultArray_json) {
        return resultArray_json.map(value => {
            return {
                id: value.id,
                name: value.label
            };
        });
    }
}

export default APIAccessor;