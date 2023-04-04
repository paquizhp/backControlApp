const mongoose = require("mongoose");

const Pay = mongoose.model(
  "Pay",
  new mongoose.Schema({
    date: Date,
    job: String,
    price: Number,
    worker:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker"
      }
  })
);

module.exports = Pay;
