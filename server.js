const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const cors = require('cors');

const customerLogger = require('./utils/logger');

// create an instance of the Express
const app = express();

// Add bodyParser middleware to parse JSON data in the request body
app.use(bodyParser.json());

// it adds the middlewear function to express
app.use(express.urlencoded({ extended: true }));

// to add the json middlewear in express
app.use(express.json());

// add the cors middlewear in  express
app.use(cors());

// here we import the allroutes.routes file in server.js
const allRoutes = require('./routes/allroutes.routes');

// add the allroutes in express
app.use('/', allRoutes);

const port = 6000;

app.listen(port, () => {
  customerLogger.info(`Server is running on port ${port}`);
});
