/*
  Cheat Sheet: https://neo4j.com/docs/cypher-refcard/current/
*/

const neo4j = require('neo4j-driver').v1;
const varNames = {
    organization: "organization",
    organizationUidLabel: "wikidata_id"
};

class Neo4jInterface {
    constructor(){
        const neo4jDriver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
        const neo4jSession = neo4jDriver.session();

        this.props = {
            neo4jDriver,
            neo4jSession
        }
    }

    addCompany(localCorporationDataFormat) {
        this._updateEntry({
            type: varNames.organization,
            fields: localCorporationDataFormat,
            uidLabel: varNames.organizationUidLabel
        });
    }

    addRelation(addRelationshipFormat) {

    }

    _updateEntry(updateEntryFormat){
        const typeName = updateEntryFormat.type;
        const uidFieldName = updateEntryFormat.uidLabel;

        console.log(updateEntryFormat);
        // language=Cypher
        const query = `
MERGE (n:${typeName} {${uidFieldName}: $uid})
SET n = $fields
RETURN n
`;
        const params = {
            fields: updateEntryFormat.fields,
            uid: updateEntryFormat.fields[uidFieldName]
        };

        return this.props.neo4jSession
            .run(query, params)
            .then(console.log)
            .catch(console.log);
    }
}

export default Neo4jInterface;