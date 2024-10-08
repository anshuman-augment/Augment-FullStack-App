# Customize a Full Stack Application using [Augment Code](https://wwww.augmentcode.com)


This repo stores a full stack project using Angular for the frontend and an Express server as the backend.
The branches represent different stages/demos:

- `main` - Contains the completed application, with a functioning Express server, server-side security, authentication & login guardrails for the front-end, and some debug logs. WILL CONTINUOUSLY BE ADDED UPON.
- `frontend` - Starting point of the application, with a basic frontend using a local DB and json-server. Walk through for this branch would be setting up a 'Search' feature with Augment.
- `dependencies` - Contains the updated dependencies package.json, using Augment Code recommendations. TO BE ADDED.
- `backend` - The completed Express server for the backend, adding upon and integrating with the `frontend` branch.
- `mongoDB` - The completed integration of mongoDB with the backend. 
- `backend-security` - Completed security for the Express server using authN and authZ, including the creation of JWTs and tokenization methods, along with RBAC for certain API endpoints. 
- `frontend-security` - Adds upon backend-security branch to implement a login portal, along with auth-based guardrails for site routing. TO BE ADDED
- `graphQL` - The completed updated integration of GraphQL with the backend, instead of using REST.

*YOUTUBE SERIES TO FOLLOW ALONG WILL BE ADDED SOON*

# TO RUN THE PROJECT FROM /graphQL

*SETUP*
- Ensure you have `node.js` and `npm` installed.
- Check the version of node using `node --version`
- If node version is <18, updated node using `nvm install 20` and switch to the new version using `nvm use 20`
- Install the latest version of Angular using `npm install -g @angular/cli`

*DEPLOY*
- In a new Terminal, switch to the **backend** directory and run `node server.js`. This should build and deploy the Express server on localhost using GraphQL.
- If there are any issues, you may try `npm install` to update the package-lock.json and restart the server.
- In a new Terminal, run a curl command to test if server responses are expected/working. 

