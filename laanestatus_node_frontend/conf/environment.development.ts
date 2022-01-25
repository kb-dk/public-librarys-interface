export const environment = {
    production: false,

    //Login
    CHECK_CREDS_URL: 'api/checkCreds', //POST with json, no query params

    //Primo url
    PRIMO_URL_BEFORE: 'https://soeg.kb.dk/discovery/fulldisplay?docid=alma',
    //MMS ID is inserted between these, for an url like
    // https://soeg.kb.dk/discovery/fulldisplay?docid=alma{{MMS_ID}}&context=U&vid=45KBDK_KGL:KGL&lang=da
    PRIMO_URL_AFTER: '&context=U&vid=45KBDK_KGL:KGL&lang=da',

    //Laanstatus
    GET_LOANS_URL: 'api/partnerLoans/', //{partnerID}

    //BCI DEPOTS
    GET_DEPOTS_URL: 'api/depots/', //{partnerID}
    GET_DEPOT_URL: 'api/depot/', //{partnerID}/{depotID}
    GET_DEPOT_PDF_URL: 'api/depot/pdf/', //{partnerID}/{depotID}/{type}

    //By setting this, you can force the angular to use a different
    //backend from the one deployed with the application
    //This value is prefixed to all the 'api/*' URLS above
    //Set it to '' to ignore this feature
    API_HOST_URL: 'http://localhost:4220/laanestatus/',
};
