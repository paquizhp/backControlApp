const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Worker = db.worker;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

//////////////////
checkDuplicateWorker = (req, res, next) => {
  // Name
  Worker.findOne({
    nickName: req.body.nickName
  }).exec((err, worker) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (worker) {
      res.status(400).send({ message: "Failed! nick is already in use!" });
      return;
    }

    // Email
  Worker.findOne({
    telephone: req.body.telephone
    }).exec((err, worker) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (worker) {
        res.status(400).send({ message: "Failed! telephone is already in use!" });
        return;
      }
      next();
    });
  });
};
/////////////////

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkDuplicateWorker
};

module.exports = verifySignUp;
