# Customize a Full Stack Application using [Augment Code](augmentcode.com)


This repo stores a full stack project using Angular for the frontend and an Express server as the backend.
The branches represent different stages/demos:

- `main` - Contains the completed application, with a functioning Express server, server-side security, authentication & login guardrails for the front-end, and some debug logs. WILL CONTINUOUSLY BE ADDED UPON.
- `frontend` - Starting point of the application, with a basic frontend using a local DB and json-server. Walk through for this branch would be setting up a 'Search' feature with Augment. TO BE ADDED
- `dependencies` - Contains the updated dependencies package.json, using Augment Code recommendations
- `backend` - The completed Express server for the backend, integrated with the frontend. TO BE ADDED
- `mongoDB` - The completed integration of mongoDB with the backend. TO BE ADDED
- `backend-security` - Completed security for the Express server using authN and authZ, including the creation of JWTs and tokenization methods, along with RBAC for certain API endpoints. TO BE ADDED
- `frontend-security` - Adds upon backend-security branch to implement a login portal, along with auth-based guardrails for site routing. TO BE ADDED

- *YOUTUBE SERIES TO FOLLOW ALONG WILL BE ADDED SOON*

# TO RUN THE PROJECT FROM /main

*SETUP*
- Ensure you have `node.js` and `npm` installed.
- Check the version of node using `node --version`
- If node version is <18, updated node using `nvm install 20` and switch to the new version using `nvm use 20`
- Install the latest version of Angular using `npm install -g @angular/cli`

*DEPLOY*
- In an open Terminal, switch to the **frontend** directory and run `ng serve`. This should build and deploy the Angular app on localhost.
- If there are any issues, you may try `npm install` or `npm install --legacy-peer-deps`. Also ensure you are on Node v20


- In a separate Terminal, switch to the **backend** directory and run `node server.js`. This should build and deploy the Express server on localhost.
- If there are any issues, you may try `npm install` to update the package-lock.json and retry to start the server.