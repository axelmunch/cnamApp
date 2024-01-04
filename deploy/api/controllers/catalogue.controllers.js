const catalogue = [
  { ref: "A", name: "Smartphone", price: 899.99 },
  { ref: "B", name: "Laptop", price: 619.99 },
  { ref: "C", name: "Headphones", price: 299.99 },
  { ref: "D", name: "Smartwatch", price: 199.99 },
  { ref: "E", name: "Robot vacuum cleaner", price: 335.88 },
  { ref: "F", name: "VR headset", price: 349.99 },
  { ref: "G", name: "Bicycle", price: 600 },
  { ref: "H", name: "Printer", price: 120 },
  { ref: "I", name: "Drone", price: 199.99 },
  { ref: "J", name: "Shower gel", price: 12.5 },
];

const db = require("../models");
const Catalogue = db.catalogue;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
  let searchText = req.query.q ?? "";
  searchText = searchText.toLowerCase();
  let priceInf = req.query.priceInf ?? 0;

  let searchCond = [];
  if (searchText.length > 0) {
    searchCond.push({ name: { [Op.iLike]: `%${searchText}%` } });
  }
  if (priceInf > 0) {
    searchCond.push({ price: { [Op.lt]: priceInf } });
  }

  Catalogue.findAll({
    limit: 10,
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
