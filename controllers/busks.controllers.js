const {
  selectBusks,
  addBusk,
  fetchBusksById,
  removeBusksById,
} = require("../models/busks.models");

exports.getBusks = (req, res, next) => {
  const sort_by = req.query.sort_by
  const order = req.query.order
  selectBusks(sort_by, order).then((busks) => {
    res.status(200).send({ busks });
  })
  .catch((err) => {
    next(err)
  })
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
      res.status(201).send({ busk });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBusksById = (req, res, next) => {
  const { busk_id } = req.params;

  removeBusksById(busk_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
