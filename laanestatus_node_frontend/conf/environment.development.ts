export const environment = {
    production: false,
    //Things ending with / expects to code to postfix an ID
    //things NOT ending in / expects to be used directly
    CHECK_CREDS_URL: 'http://localhost:4220/laanestatus/api/checkCreds',
    GET_LOANS_URL: 'http://localhost:4220/laanestatus/api/partnerLoans/',

    //BCI DEPOTS
    GET_DEPOTS_URL: 'http://localhost:4220/laanestatus/api/depots',
    GET_DEPOT_URL: 'http://localhost:4220/laanestatus/api/depot/',
    GET_DEPOT_PDF_URL: 'http://localhost:4220/laanestatus/api/depot/pdf/',
};
