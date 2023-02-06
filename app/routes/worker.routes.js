const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/worker.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/worker/add",
    [
      authJwt.verifyToken,
      authJwt.isAdmin, 
      verifySignUp.checkDuplicateWorker,
     
      
    ],
    controller.addWorker
  );

  app.get("/api/worker/all", controller.allWorker);

  app.post("/api/worker/delete",
    [
      authJwt.verifyToken, 
      authJwt.isAdmin
    ], 
    controller.deleteWorker);
};
