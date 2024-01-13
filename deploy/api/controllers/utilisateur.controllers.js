const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");

const jwt = require("jsonwebtoken");

const pattern = /^[A-Za-z0-9]{1,20}$/;

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

const db = require("../models");
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password,
  };

  // Test
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    Utilisateur.findOne({ where: { login: utilisateur.login } })
      .then((data) => {
        if (data) {
          if (data.password != utilisateur.password) {
            res.status(400).send({
              message: "Incorrect password",
            });
            return;
          }

          const user = {
            id: data.id,
            name: data.nom,
            email: data.email,
          };

          let accessToken = generateAccessToken(user);
          res.setHeader("Authorization", `Bearer ${accessToken}`);
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user ${utilisateur.login}.`,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: "Error retrieving user " + utilisateur.login,
        });
      });
  } else {
    res.status(400).send({
      message: "Bad login or password",
    });
  }
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.login) {
    res.status(400).send({
      message: "Login can not be empty!",
    });
    return;
  }

  // Create a Utilisateur
  const utilisateur = {
    // id: uuidv4(),
    nom: req.body.nom ?? null,
    prenom: req.body.prenom ?? null,
    adresse: req.body.adresse ?? null,
    codepostal: req.body.codepostal ?? null,
    ville: req.body.ville ?? null,
    email: req.body.email ?? null,
    sexe: req.body.sexe ?? null,
    login: req.body.login,
    password: req.body.password,
    telephone: req.body.telephone ?? null,
  };

  // Login and password required
  if (!utilisateur.login || !utilisateur.password) {
    res.status(400).send({
      message: "Login and password required",
    });
    return;
  }

  // Check if login already exists
  Utilisateur.findOne({ where: { login: utilisateur.login } })
    .then((data) => {
      if (data) {
        res.status(400).send({
          message: "Login already exists",
        });
      } else {
        // Create user
        Utilisateur.create(utilisateur)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                "Error while creating the Utilisateur. " + err.message ?? "",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving user " + utilisateur.login,
      });
    });
};
