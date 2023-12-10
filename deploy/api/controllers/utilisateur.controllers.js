const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

let utilisateurs = [
    {
        nom: "Maurice",
        prenom: "Emmanuel",
        login: "emma",
        email : "emmanuel.maurice@gmail.com",
        password : "toto"
    }
]

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  console.log(req.body);

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {

        const uuid = uuidv4 ();
        let utilisateur;

        for (let i=0; i<utilisateurs.length; i++) {
            if (utilisateurs[i].login == req.body.login && utilisateurs[i].password == req.body.password) {
                utilisateur = utilisateurs[i];
                break;
            }
        }
        if(!utilisateur) {
            res.status(401).send({
                message: "Erreur d'authentification"
            });
            return;
        }
        utilisateur.id = uuid;

        const user = {
          id: utilisateur.id,
          name: utilisateur.nom,
          email: utilisateur.email
        };
      
        
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        console.log (accessToken);

      
        res.send(utilisateur);
    };    
};

exports.create = (req, res) => {
    const input = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    };
  
    console.log(req.body);
  
    // Test
    let pattern = /^[A-Za-z0-9]{1,20}$/;
    let valid = true;
    for(let i = 0; i < utilisateurs.length; i++) {
        if (utilisateurs[i].login == input.login) {
            valid = false;
            break;
        }
    }

    if(!valid)
    {
        res.status(401).send({
            message: "Erreur de création"
        });
        return;
    }

    utilisateurs.push(input);

    res.send(input);
  };