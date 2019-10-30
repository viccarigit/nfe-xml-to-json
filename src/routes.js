import { Router } from 'express';
import upload from './app/middlewares/upload';
import fileExists from './app/middlewares/file-exists';

import NfeController from '../src/app/controllers/NfeController';

const routes = new Router();

routes.get('/', (req, res)=>{
  return res.json({isOk: true});
});

routes.get('/xmlToJSON', NfeController.index);
routes.post('/xmlToJSON', upload.single('xml'), fileExists, NfeController.parseToJSON);
routes.post('/xmlToJSON/emitente', upload.single('xml'), fileExists, NfeController.emitenteToJSON);
routes.post('/xmlToJSON/destinatario', upload.single('xml'), fileExists, NfeController.destinatariToJSON);
routes.post('/xmlToJSON/itens', upload.single('xml'), fileExists, NfeController.itensToJSON);
routes.post('/xmlToJSON/totais', upload.single('xml'), fileExists, NfeController.totaisToJSON);
routes.post('/xmlToJSON/principal', upload.single('xml'), fileExists, NfeController.principalToJSON);

export default routes;
