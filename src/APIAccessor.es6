import fetch from 'node-fetch';
import WikidataParser from './wikidataParser';

const prettyjson = require('prettyjson');


// https://query.wikidata.org

/*
    Accesses APIs for OpenCorporate and WikiData into a local format
    https://docs.google.com/document/d/1nkifpLDTKNVtRUXca9XQRhZG1BQGOh56egNUCwIhbdI/edit

 */
class APIAccessor {
    constructor(){
        const wikidataParser = new WikidataParser();
        this.state = {
            wikidataParser
        }
    }

    getCompanyByName_OpenCorporate(searchTerm) {
        searchTerm = encodeURIComponent(searchTerm);
        const params = [
            `order=score`,
            `inactive=false`
        ].join('&');
        return fetch(`https://api.opencorporates.com/v0.4/companies/search?q=${searchTerm}&${params}`);
    }

    searchNames_wikidata(searchTerm) {
        return this.state.wikidataParser.searchForOrganizationsByName(searchTerm);
    }

    getParentOrganization_wikidata(wikidataId){
        return this.state.wikidataParser.getParentOrganizationFromId(wikidataId);
    }

}

export default APIAccessor;