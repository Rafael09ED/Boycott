import OpenCorporatesAPI from "./OpenCorporatesAPI";

const openCorporate = new OpenCorporatesAPI();


openCorporate.getCompanyByName("google")
    .then(value => {
        console.log(value);
    });