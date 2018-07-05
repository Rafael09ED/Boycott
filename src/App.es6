// import neo4j from "neo4j-driver/lib/browser/neo4j-web";
import APIAccessor from './APIAccessor';

/*
const neo4jDriver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
const neo4jSession = neo4jDriver.session();
*/

const APIAccessorInstance = new APIAccessor();




APIAccessorInstance
    .searchNames_wikidata("google")
    .then(data => {
        console.log(data)
    });

console.log("- -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -");

APIAccessorInstance
    .getParentOrganization_wikidata("Q95")
    .then(data => {
        console.log(data)
    });