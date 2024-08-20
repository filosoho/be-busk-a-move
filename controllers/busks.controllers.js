const {
  selectBusks,
  addBusk,
  fetchBusksById,
} = require("../models/busks.models");

exports.getBusks = (req, res, next) => {
  selectBusks().then((busks) => {
    res.status(200).send({ busks });
  });
};

exports.getBusksById = (req, res, next) => {
  const { busk_id } = req.params;
  fetchBusksById(busk_id)
    .then((busk) => {
      res.status(200).send({ busk });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postBusk = (req, res, next) => {
  addBusk(req.body)
    .then((busk) => {
      console.log(busk);
      {
        res.status(201).send({ busk });
      }
    })
    .catch((err) => {
      next(err);
    });
};
