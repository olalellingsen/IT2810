# Backend

## About

The backend of this application is written using typescript/node and utilises GraphQL via apollo server to communicate with the database.
It connects up to a mongodb database and runs on localhost with port 4000.
The database contains a little over 1400 products that were gained from https://kassal.app/

## Organisation

The most important folders and files are listed below.

- dist: The dist folder contains the javascript to which all the code in this application is compiled to, it is the contents of the dist folder that are actually run.
- typeDef.ts: The typdeDefs.ts file inside the backend/src/models folder contains the structure of the data expected to be sent to the database via mutations and the structure of the data returned by the database as a response to queries. Furthermore, the file contains a list available of queries and mutations and their inputs.
- resolvers: The resolvers.ts file is the file containing the resolver functions. the resolver functions are the ones actually executing the different queries and mutations. It is here the backend actually communicates with the database.
- index.ts: This file is where the apollo server is initialised.

## Running the backend

### Running it from the root of the project

To run the backend from the root folder of the project, that is the GoCart folder, you will have to:

- cd into the root folder using a terminal
- run: `npm run back`

To run the backend permanently (even when the terminal is closed) on the vm:

- cd into the backend folder
- run: `sudo npm install`
- run: `sudo npm run compile`
- run: `nohup node ./dist/index.js &`
