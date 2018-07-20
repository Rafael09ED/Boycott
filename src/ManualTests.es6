import Neo4jInterface from "./Neo4jInterface";
import APIAccessor from "./APIAccessor";
const APIAccessorInstance = new APIAccessor();

const neo4jDbProps = {};
const Neo4j = new Neo4jInterface(neo4jDbProps);

const localCorporationDataFormat = {};
const termToAdd = "google";

APIAccessorInstance
    .searchNames_wikidata(termToAdd)
    .then(data => {
        console.log(`Search Term: ${termToAdd}`);
        if (data.length <= 0){
            console.log("No results found");
            return;
        }

        console.log("First Result: ");
        const firstResult = data[0];
        console.log(firstResult);
        Neo4j.addCompany(firstResult);
    });

