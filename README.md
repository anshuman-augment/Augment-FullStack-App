# TO RUN THE PROJECT FROM /mongoDB

*SETUP FOR MONGODB ATLAS*
- Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas) and create an account or sign in.
- Create a new project (if you don't have one already).
- Click "Build a Database" and choose the free shared cluster option.
- Select your preferred cloud provider and region, then click "Create Cluster".


*Set up database access:*

- In the security menu, click "Database Access"
- Add a new database user with a username and password
- Give this user "Read and write to any database" permissions

*Set up network access:*

- In the security menu, click "Network Access"
- Click "Add IP Address"
- For development purposes, you can allow access from anywhere by entering 0.0.0.0/0
- Note: For production, you should restrict this to your application's IP
  
*Get your connection string:*

- Go back to your cluster view and click "Connect"
- Choose "Connect your application"
- Copy the connection string
- Update your .env file in the backend directory with the connection string

*SETUP*
- Ensure you have `node.js` and `npm` installed.
- Check the version of node using `node --version`
- If node version is <18, updated node using `nvm install 20` and switch to the new version using `nvm use 20`
- Install the latest version of Angular using `npm install -g @angular/cli`
- Install the necessary dependencies in **backend** using `npm install express cors mongoose dotenv`

*DEPLOY*
- In an open Terminal, switch to the **frontend** directory and run `ng serve`. This should build and deploy the Angular app on localhost.
- If there are any issues, you may try `npm install` or `npm install --legacy-peer-deps`. Also ensure you are on Node v20

- In a separate Terminal, switch to the **backend** directory and run `node server.js `. This should build and deploy the Express server on localhost.

