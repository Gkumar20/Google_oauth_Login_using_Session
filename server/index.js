require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 5000;
const db = require('./database/conn');
const Router = require('./routes/Router'); 

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Set the allowed origin and include credentials

app.use('/', Router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
