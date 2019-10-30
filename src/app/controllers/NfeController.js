import NfeService from '../services/NfeService';

class NfeController{
  index(req, res){
    return res.json({ message: `Service's alive` });
  }

  async parseToJSON(req, res){
    const nfeService = new NfeService(req.file);
    const obj = await nfeService.parse();
    return res.json(obj);
  }

  async emitenteToJSON(req, res){
    const nfeService = new NfeService(req.file);
    const obj = await nfeService.getEmitentefrom(nfeService.nfeObject);

    return res.json(obj);
  }

  async destinatariToJSON(req, res){
    const nfeService = new NfeService(req.file);
    const obj = await nfeService.getDestinatarioFrom(nfeService.nfeObject);

    return res.json(obj);
  }

  async itensToJSON(req, res){
    const nfeService = new NfeService(req.file);
    const obj = await nfeService.getItensFrom(nfeService.nfeObject);

    return res.json(obj);
  }

  async totaisToJSON(req, res){
    const nfeService = new NfeService(req.file);
    const obj = await nfeService.getTotaisFrom(nfeService.nfeObject);

    return res.json(obj);
  }

  async principalToJSON(req, res){
    const nfeService = new NfeService(req.file);
    const obj = await nfeService.getPrincipalFrom(nfeService.nfeObject);

    return res.json(obj);
  }

}

export default new NfeController();
