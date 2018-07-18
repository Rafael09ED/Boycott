import Neo4jInterface from "./Neo4jInterface";

const neo4jDbProps = {};
const Neo4j = new Neo4jInterface(neo4jDbProps);



const localCorporationDataFormat = {};
Neo4j.updateWithInfo(localCorporationDataFormat);
