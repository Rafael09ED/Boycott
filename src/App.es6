
/*
	https://docs.google.com/document/d/1nkifpLDTKNVtRUXca9XQRhZG1BQGOh56egNUCwIhbdI/edit
*/


import APIAccessor from './APIAccessor';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const APIAccessorInstance = new APIAccessor();

function getCompanyInfo(searchTerm) {
    APIAccessorInstance
        .searchNames_wikidata(searchTerm)
        .then(data => {
            console.log(`Search Term: ${searchTerm}`);
            console.log("First Result: ");
            const firstResult = data[0];
            console.log(firstResult);
            if (firstResult === undefined)
                return;
            const searchID = firstResult.wikidata_id;
            APIAccessorInstance
                .getParentOrganization_wikidata(searchID)
                .then(data => {
                    console.log("Parent Organization:");
                    console.log("- -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -");
                    console.log(data);
                    console.log("- -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -");
                });
            APIAccessorInstance
                .getSubsidiaryOrganizations_wikidata(searchID)
                .then(data => {
                    console.log("Subsidiaries:");
                    console.log("- -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -");
                    console.log(data);
                    console.log("- -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -");
                });
        });
}

rl.question('Enter Company Name\n', searchTerm => {
    getCompanyInfo(searchTerm);
    rl.close();
});


