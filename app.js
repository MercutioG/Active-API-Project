// Server set up and goofy stuff!!!!

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // parse JSON requests
const connectDB = require('./config/db');
const taskRoutes = require('./routes/router');

// Load env variables
dotenv.config({ path: './.env' });

// Initialize express app
const app = express();

// Middleware that parses JSON requests
app.use(bodyParser.json());

app.use(cors());

connectDB();

app.use(taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
