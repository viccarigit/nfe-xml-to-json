export default function fileSended(req, res, next){
    if(!req.file){
        return res.status(400).json({error: 'XML file is required'});
    }

    return next();
}

