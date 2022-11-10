const fileCheck= (req, res, next)=>{
    if(!req.files || Object.keys(req.files).length===0 || !req.files.file){
        return res.status(400).json({message: "no file"});
    }
    next();
}

module.exports= {
    fileCheck
}