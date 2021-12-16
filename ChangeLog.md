# Changelog
All notable changes to librarylending will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.5 - 2021-12-16

* Restored java middleware layer in interlibraryloans
This restores the file `laanestatus-behaviour.yaml`
```yaml
libraryloans:
  address: http://devel12.statsbiblioteket.dk:9011/librarylending/v1/ 
```
This can be overridden by by the file ```laanestatus-environment.yaml```
The location of these files are controlled by `laanestatus.xml`
```xml
<Context docBase="/home/almalile/services/tomcat-apps/laanestatus.war">

  <Environment name="laanestatus-logback-config"
               value="/home/almalile/services/conf/laanestatus-logback.xml"
               type="java.lang.String"
               override="false"/>

  <!-- Note that the application-config is defined using globbing: Multiple config files are merged -->
  <Environment name="application-config"
               value="/home/almalile/services/conf/laanestatus-*.yaml"
               type="java.lang.String"
               override="false"/>
</Context>
```

There is no longer any need for the backend to be publically available. The frontend now contains a java-portion that
calls the backend. 


## 1.4 - 2021-12-14

Correctly build angular for production despite the best efforts of Maven to sabotage this

## 1.3 - 2021-12-14

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
