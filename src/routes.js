const { Router } = require('express');
const upload =  require('./app/middlewares/upload');
import NfeController from '../src/app/controllers/NfeController';

const routes = new Router();

routes.get('/', (req, res)=>{
  return res.json({isOk: true});
});

routes.get('/xmlToJson', NfeController.index);
routes.post('/xmlToJson', upload.single('xml'), NfeController.parseToJSON);

module.exports = routes;
