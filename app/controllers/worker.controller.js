const db = require("../models");
const Worker = db.worker;

exports.addWorker = (req, res) => {
  const worker = new Worker({
    name: req.body.name,
    nickName: req.body.nickName,
    telephone: req.body.telephone
  });

  worker.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};

exports.allWorker = (req, res) => {
  Worker.find({}).exec((err, workers) =>{
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    else if (!workers){
      res.status(400).send({ message: "No se encontraron trabajadores" });
      return;
    }
    else{

      res.status(200).send({workers});
    }
  })
  
};

exports.deleteWorker = (req, res) => {
 
  Worker.deleteOne({telephone: req.body.telephone}).exec((err, data) =>{
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({data});
  })
};

