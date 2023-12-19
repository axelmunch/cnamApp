const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const catalogue = require("../controllers/catalogue.controllers.js");
  
    var router = require("express").Router();
  

   
    router.get("/", checkJwt,catalogue.get);
    
    router.get("/search", checkJwt,catalogue.search);
  
    app.use('/api/catalogue', router);
  };
