# TO RUN THE PROJECT FROM /backend-security

*SETUP*
- Ensure you have `node.js` and `npm` installed.
- Check the version of node using `node --version`
- If node version is <18, updated node using `nvm install 20` and switch to the new version using `nvm use 20`
- Install the latest version of Angular using `npm install -g @angular/cli`
- Install the necessary dependencies in **backend** using `npm install jsonwebtoken bcryptjs`

*DEPLOY*
- In a Terminal, switch to the **backend** directory and run `node server.js `. This should build and deploy the Express server on localhost.
- In a separate Terminal, verify a token is sent by using the curl command `curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "password123"}' http://localhost:3000/api/login`

