const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };
  
  // Middleware for role-based authorization
  const authorize = (roles = []) => {
    return (req, res, next) => {
      if (roles.length && !roles.includes(req.userRole)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  };
  
  // Login route
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const data = await readData();
      const user = data.users.find(u => u.username === username);
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error during login' });
    }
  });
  
  // GET all locations (protected, accessible by all authenticated users)
  app.get('/api/locations', verifyToken, async (req, res) => {
    try {
      const data = await readData();
      res.json(data.locations);
    } catch (error) {
      res.status(500).json({ message: 'Error reading data' });
    }
  });
  
  // GET location by id (protected, accessible by all authenticated users)
  app.get('/api/locations/:id', verifyToken, async (req, res) => {
    try {
      const data = await readData();
      const location = data.locations.find(loc => loc.id === parseInt(req.params.id));
      if (location) {
        res.json(location);
      } else {
        res.status(404).json({ message: 'Location not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error reading data' });
    }
  });
  
  // POST new location (protected, accessible only by admin)
  app.post('/api/locations', verifyToken, authorize(['admin']), async (req, res) => {
    try {
      const data = await readData();
      const newLocation = {
        id: data.locations.length,
        ...req.body
      };
      data.locations.push(newLocation);
      await writeData(data);
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(500).json({ message: 'Error creating location' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });