const {
	selectBusks,
	addBusk,
	fetchBusksById,
	removeBusksById,
	patchBusk,
} = require("../models/busks.models");

exports.getBusks = (req, res, next) => {
	const instrument = req.query.instruments;
	const sort_by = req.query.sort_by;
	const order = req.query.order;
	selectBusks(sort_by, order, instrument)
		.then((busks) => {
			res.status(200).send({ busks });
		})
		.catch((err) => {
			next(err);
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
			res.status(201).send({ busk });
		})
		.catch((err) => {
			next(err);
		});
};

exports.patchBusksById = (req, res, next) => {
	const { busk_id } = req.params;
	const location = req.body.busk_location_name;
	patchBusk(busk_id, location)
		.then((busk) => {
			res.status(200).send({ busk });
		})
		.catch((error) => {
			next(error);
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
