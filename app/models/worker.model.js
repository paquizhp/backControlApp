const mongoose = require("mongoose");

const Worker = mongoose.model(
  "Worker",
  new mongoose.Schema({
    name: String,
    nickName: String,
    telephone: String,
  })
);

module.exports = Worker;
