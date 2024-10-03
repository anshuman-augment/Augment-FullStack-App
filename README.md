# TO RUN THE PROJECT FROM /frontend

*SETUP*
- Ensure you have `node.js` and `npm` installed.
- Check the version of node using `node --version`
- If node version is <18, updated node using `nvm install 20` and switch to the new version using `nvm use 20`
- Install the latest version of Angular using `npm install -g @angular/cli`
- Install the latest version of json-server using `npm install express cors mongoose dotenv`

*DEPLOY*
- In an open Terminal, switch to the **frontend** directory and run `ng serve`. This should build and deploy the Angular app on localhost.
- If there are any issues, you may try `npm install` or `npm install --legacy-peer-deps`. Also ensure you are on Node v20

- In a separate Terminal, switch to the **backend** directory and run `node server.js `. This should build and deploy the Express server on localhost.

