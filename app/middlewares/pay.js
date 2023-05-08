const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const { find } = require("../models/user.model.js");
const Worker = db.worker;
const Pay = db.pay;



checkWorkerExisted = (req, res, next) => {
  const idWorker= req.body.worker;
  Worker.findById(idWorker).exec((err, user) => {
    if (err) {
      res.status(400).send({ message: `Failed! Worker does not exist!` });
      return;
    } 
    if(user){
      console.log("check work", user);
      next();
    }
   
  });
};

checkDuplicatePay = (req, res, next) => {
  Pay.findOne({ date:req.body.date, job: req.body.job, worker: req.body.worker}) 
  .then((pay) => {
    if (pay) {
      console.log("pay duplicado", pay);
      res.status(409).send({ message: `Failed! Pay duplicated!` });
    } else {
      console.log("no hay pay duplicado");
      next();
    }
  })
  .catch((error) => {
    console.log("error en la consulta", error);
    res.status(400).send({ message: error.message });
  });
};
  
  /*
  exec((err, pay) => {
    if (err) {
      console.log("******",error);
      res.status(400).send({ message: error});
      return;
    } 
    if(pay){
      res.status(400).send({ message: `Failed! Pay duplicated!` });
    }
    if(!pay){
      console.log("no hay usaer");
      next();
    }
    console.log("termina", pay);
    //next();
  });
  
};
*/
const verifyPay = {
  checkWorkerExisted,
  checkDuplicatePay
};
module.exports = verifyPay;
