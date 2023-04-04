const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.worker = require("./worker.model");
db.pay = require("./pay.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;