const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);

    // create utilisateur
    router.post("/create", utilisateur.create);
  
    app.use('/api/utilisateur', router);
  };
