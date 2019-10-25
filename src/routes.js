const { Router } = require('express');
const xmlToJsonController = require('./app/controllers/xml-to-json-controller');
const upload =  require('./app/middlewares/upload');

const routes = new Router();

routes.get('/', (req, res)=>{
  return res.json({isOk: true});
});

routes.get('/xmlToJson', xmlToJsonController.index);
routes.post('/xmlToJson', upload.single('xml'), xmlToJsonController.parse);

module.exports = routes;