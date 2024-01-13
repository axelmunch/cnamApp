const db = require("../models");
const Catalogue = db.catalogue;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
  let searchText = req.query.q; // ?? "";
  searchText = searchText.toLowerCase();
  let priceInf = req.query.priceInf; // ?? 0;

  let searchCond = [];
  if (searchText.length > 0) {
    searchCond.push({ name: { [Op.iLike]: `%${searchText}%` } });
  }
  if (priceInf > 0) {
    searchCond.push({ price: { [Op.lt]: priceInf } });
  }

  Catalogue.findAll({
    limit: 20,
    where: {
      [Op.and]: searchCond,
    },
  })
    .then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Error retrieving catalogue, " + err.message,
      });
    });
};

exports.getById = (req, res) => {
  const id = req.params.id;

  Catalogue.findByPk(id)
    .then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Error retrieving catalogue, " + err.message,
      });
    });
};
