export const environment = {
    production: false,

    //Things ending with / expects to code to postfix an ID
    //things NOT ending in / expects to be used directly

    //Login
    CHECK_CREDS_URL: 'api/checkCreds',

    //Primo url
    PRIMO_URL_BEFORE: 'https://soeg.kb.dk/discovery/fulldisplay?docid=alma',
    PRIMO_URL_AFTER: '&context=U&vid=45KBDK_KGL:KGL&lang=da',

    //Laanstatus
    GET_LOANS_URL: 'api/partnerLoans/', //{partnerID}

    //BCI DEPOTS
    GET_DEPOTS_URL: 'api/depots/', //{partnerID}
    GET_DEPOT_URL: 'api/depot/', //{partnerID}/{depotID}
    GET_DEPOT_PDF_URL: 'api/depot/pdf/', //{partnerID}/{depotID}/{type}

    API_HOST_URL: '',
};
