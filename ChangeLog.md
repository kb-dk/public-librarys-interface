# Changelog
All notable changes to librarylending will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.3 -2021-12-14

###
- Moved auth to be handled by `/librarylending/` backend, which removed almost all the java code from this service
  - Implications: The `/librarylending/` must be available on the same server 


### WebUI
- Added Google Analytics
- Added cookie consent to application
- Added url environment variables and check-credits
- Fixed CORS errors
- Fixed the production name and footer

## 1.2 - 2021-12-01
### Fxed

- Deployment path changed from `/interlibraryloans/` to `/laanestatus`
- Newer versions of a few libraries

## 1.1 - 2021-11-15
### Added

- Fixed a few typos


## 1.0 - 2021-11-12
### Added

- Initial release of Project
