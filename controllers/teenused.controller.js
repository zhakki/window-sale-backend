const { Teenused } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const teenused = await Teenused.findAll();
    res.json(teenused);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nimetus, hind } = req.body;

    const teenus = await Teenused.create({ nimetus, hind });

    res.status(201).json({ message: 'Service created', teenus });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
};
