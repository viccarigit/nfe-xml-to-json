/* const express = require('express');
const xmlparser = require('express-xml-bodyparser');

const apiConfig = require('./app/config/api-config');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());
app.use(routes);
app.use(express.json());

app.listen(apiConfig.port, () =>{
  console.log(`App's running on port ${apiConfig.port}`);
}); */

import app from './App';

app.listen(3333, () =>{
  console.log('App running on port 3333');
});
