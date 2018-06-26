const wikidataPropNameMap = {
    parentOrganization: 'P749',
    subsidiary: 'P355',
};
// https://query.wikidata.org
class CorporateLoader {
    constructor(props) {
        const neo4jSession = props.neo4jSession;
        this.props = {
            neo4jSession
        };
    }

}

export default CorporateLoader;