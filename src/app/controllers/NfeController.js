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
}

export default new NfeController();
