const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);

    // Create
    router.post("/", utilisateur.create);
  
    app.use('/api/utilisateur', router);
  };
