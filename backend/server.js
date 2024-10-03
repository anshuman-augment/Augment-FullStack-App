const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

// Read data from the JSON file
async function readData() {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

// Write data to the JSON file
async function writeData(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// GET all locations
app.get('/api/locations', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.locations);
  } catch (error) {
    res.status(500).json({ message: 'Error reading data' });
  }
});

// GET location by id
app.get('/api/locations/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});