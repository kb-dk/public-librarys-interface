export const environment = {
    production: false,

    //Things ending with / expects to code to postfix an ID
    //things NOT ending in / expects to be used directly
    CHECK_CREDS_URL: 'api/checkCreds',
    GET_LOANS_URL: 'api/partnerLoans/', //{partnerID}

    //BCI DEPOTS
    GET_DEPOTS_URL: 'api/depots/', //{partnerID}
    GET_DEPOT_URL: 'api/depot/', //{partnerID}/{depotID}
    GET_DEPOT_PDF_URL: 'api/depot/pdf/', //{partnerID}/{depotID}/{type}

    API_HOST_URL: '',
};
