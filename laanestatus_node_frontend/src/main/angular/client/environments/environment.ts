// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    //Things ending with / expects to code to postfix an ID
    //things NOT ending in / expects to be used directly
    CHECK_CREDS_URL: 'api/checkCreds',
    GET_LOANS_URL: 'api/partnerLoans/',

    //BCI DEPOTS
    GET_DEPOTS_URL: 'api/depots', //{partnerID}
    GET_DEPOT_URL: 'api/depot/', //{partnerID}/{depotID}
    GET_DEPOT_PDF_URL: 'api/depot/pdf/', //{partnerID}/{depotID}/{type}

    API_HOST_URL: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
