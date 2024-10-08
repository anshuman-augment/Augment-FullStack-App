const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');
const JWT_SECRET = 'your-secret-key'; // In production, use an environment variable

// Read data from the JSON file
async function readData() {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

// Write data to the JSON file
async function writeData(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Location {
    id: ID!
    name: String!
    city: String!
    state: String!
    photo: String!
    availableUnits: Int!
    wifi: Boolean!
    laundry: Boolean!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    locations: [Location!]!
    location(id: ID!): Location
    checkPasswords: [UserPassword!]!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    createLocation(name: String!, city: String!, state: String!, photo: String!, availableUnits: Int!, wifi: Boolean!, laundry: Boolean!): Location!
  }

  type UserPassword {
    username: String!
    hashedPassword: String!
  }
`);

// Define resolvers
const root = {
  locations: async () => {
    const data = await readData();
    return data.locations;
  },
  location: async ({ id }) => {
    const data = await readData();
    return data.locations.find(loc => loc.id === parseInt(id));
  },
  checkPasswords: async () => {
    const data = await readData();
    return data.users.map(user => ({
      username: user.username,
      hashedPassword: user.password
    }));
  },
  login: async ({ username, password }) => {
    const data = await readData();
    const user = data.users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      return { token };
    }
    throw new Error('Invalid credentials');
  },
  createLocation: async ({ name, city, state, photo, availableUnits, wifi, laundry }, context) => {
    if (context.user.role !== 'admin') {
      throw new Error('Not authorized');
    }
    const data = await readData();
    const newLocation = {
      id: data.locations.length,
      name,
      city,
      state,
      photo,
      availableUnits,
      wifi,
      laundry
    };
    data.locations.push(newLocation);
    await writeData(data);
    return newLocation;
  }
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Token is invalid, but we'll still allow the request to proceed
    }
  }
  next();
};

app.use('/graphql', verifyToken, graphqlHTTP((req) => ({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for testing
  context: { user: req.user }
})));

app.listen(port, () => {
  console.log(`GraphQL server is running on http://localhost:${port}/graphql`);
});