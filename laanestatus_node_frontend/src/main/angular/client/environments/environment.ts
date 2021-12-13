// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CHECK_CREDS_URL: 'http://devel12.statsbiblioteket.dk:9011/librarylending/v1/checkCreds',
  GET_LOANS_URL: 'http://devel12.statsbiblioteket.dk:9011/librarylending/v1/partnerLoans/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.