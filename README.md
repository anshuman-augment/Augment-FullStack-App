
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

