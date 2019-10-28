const { Router } = require('express');
const xmlToJsonController = require('./app/controllers/xml-to-json-controller');
const upload =  require('./app/middlewares/upload');
import NfeController from '../src/app/controllers/NfeController';

const routes = new Router();

routes.get('/', (req, res)=>{
  return res.json({isOk: true});
});

routes.get('/xmlToJson', xmlToJsonController.index);
routes.post('/xmlToJson', upload.single('xml'), xmlToJsonController.parse);
routes.post('/classView', upload.single('xml'), NfeController.parseToJSON);

module.exports = routes;
