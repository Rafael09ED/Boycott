import fetch from 'node-fetch';

const wdk = require('wikidata-sdk');
const prettyjson = require('prettyjson');
/*
    https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/queries/examples
	https://query.wikidata.org
 */

// VARIABLES

const wdt = {
    instanceOf: 'P31',
    subclassOf: 'P279',
    parentOrganization: 'P749',
    subsidiary: 'P355',
};

const wd = {
    organization: 'Q43229',
};

const endpointUrl = 'https://query.wikidata.org/sparql';

// FUNCTIONS

function getWikidataIdFromWikidataURL(url) {
    return url.split("/").pop();
}

function cleanResponseIntoOrganization(value) {
    const wikidata_id = getWikidataIdFromWikidataURL(value.item.value);
    const wikidata_name = value.itemLabel.value;
    const wikidata_description = (value.itemDescription) ? value.itemDescription.value : null;
    return {
        wikidata_id,
        wikidata_name,
        wikidata_description
    }
}

function simplifyWikidataResponse(bindings) {
    return Array
        .from(bindings)
        .map(cleanResponseIntoOrganization);
}

// CLASS

class WikidataAPI {

    searchForOrganizationsByName(orgName) {
        const numberToGet = 20;
        const sparqlQuery = `
SELECT ?item ?itemLabel ?itemDescription WHERE {
    SERVICE wikibase:mwapi {
        bd:serviceParam wikibase:api "EntitySearch" .
        bd:serviceParam wikibase:endpoint "www.wikidata.org" .
        bd:serviceParam mwapi:search "${encodeURIComponent(orgName)}" .
        bd:serviceParam mwapi:language "en" .
        ?num wikibase:apiOrdinal true.
        ?item wikibase:apiOutputItem mwapi:item .
    }
    ?item (wdt:${wdt.instanceOf}/wdt:${wdt.subclassOf}) wd:${wd.organization}.
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en" .
    }
} ORDER BY ASC (?num) LIMIT ${numberToGet}`;
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = {'Accept': 'application/sparql-results+json'};

        return fetch(fullUrl, {headers})
            .then(body => body.json())
            .then(json => Promise.resolve(simplifyWikidataResponse(json.results.bindings)));
        // console.log(prettyjson.render(json.results.bindings));
    }

    getParentOrganizationFromId(wikidataId) {
        return this
            .getValueFromProperty(wikidataId, wdt.parentOrganization)
            .then(json => Promise.resolve(simplifyWikidataResponse(json.results.bindings)))
    }

    getSubsidiariesFromId(wikidataId) {
        return this
            .getValueFromProperty(wikidataId, wdt.subsidiary)
            .then(json => Promise.resolve(simplifyWikidataResponse(json.results.bindings)))
    }

    getValueFromProperty(wikidataId, wikidataType) {
        const sparqlQuery = `
SELECT ?item ?itemLabel ?itemDescription WHERE {
	wd:${wikidataId} wdt:${wikidataType} ?item .
	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
}`;
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = {'Accept': 'application/sparql-results+json'};

        return fetch(fullUrl, {headers})
            .then(body => body.json());
    }
}

export default WikidataAPI;