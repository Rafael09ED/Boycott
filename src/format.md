###Local

`organizationDataStructure`

```json
{   
  "wikidata_id": "Q95",
  "wikidata_name": "Google",
  "wikidata_description": "American multinational Internet and technology corporation"
}
```

###Neo4j

`addCorporation` uses local data structure format

####`addRelationshipFormat`:

```
{
  corporation1: ${organizationDataStructure},
  corporation2: ${organizationDataStructure},
  corporationUid: "wikidata_id",
  relationType: "subsidiary",
  relationProperties : {}
}
```

####`updateEntryFormat`:

```
{
  "type": "organization"
  "fields": ${organizationDataStructure},
  "uidLabel": "wikidata_id"
}
```
`fields` must contain a `uidLabel` field
