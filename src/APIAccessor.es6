import fetch from 'node-fetch';
import WikidataAPI from './WikidataAPI';
import OpenCorporatesAPI from "./OpenCorporatesAPI";
const prettyjson = require('prettyjson');

/*
    https://query.wikidata.org
    Accesses APIs for OpenCorporate and WikiData into a local format
    https://docs.google.com/document/d/1nkifpLDTKNVtRUXca9XQRhZG1BQGOh56egNUCwIhbdI/edit
 */
class APIAccessor {
    constructor(){
        const wikidata = new WikidataAPI();
        const openCorporates = new OpenCorporatesAPI();
        this.state = {
            wikidataParser: wikidata,
        }
    }

    getCompanyByName_OpenCorporate(searchTerm) {

    }

    searchNames_wikidata(searchTerm) {
        return this.state.wikidataParser.searchForOrganizationsByName(searchTerm);
    }

    getParentOrganization_wikidata(wikidataId){
        return this.state.wikidataParser.getParentOrganizationFromId(wikidataId);
    }

    getSubsidiaryOrganizations_wikidata(wikidataId){
        return this.state.wikidataParser.getSubsidiariesFromId(wikidataId);
    }


}

export default APIAccessor;