mvn # public-librarys-interface

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

# How to run locally

run or if you don't have sbprojects-nexus profile run `mvn install -Psbprojects-nexus` to generate all the things

go to `laanestatus/`

run `./installLocally.sh`. This starts the system on localhost:4220/laanestatus

New terminal

go to `laanestatus_node_frontend/conf/`

change `environment.development.ts` to prefix `http://localhost:4220/laanestatus/` before urls

run `npm run-script start -- --configuration=development`

this will run a local angular instance at `http://localhost:4200/`



## Node version
Node v19.0.0 is used

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `target/` directory.

You can also build with maven, just run `mvn package` to build the project


