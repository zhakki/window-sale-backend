const { TeenusedTeostajad, Tootaja } = require('../models');

exports.getByServiceList = async (req, res) => {
  try {
    const { teenused_list_id } = req.params;

    const results = await TeenusedTeostajad.findAll({
      where: { teenused_list_id },
      include: { model: Tootaja, foreignKey: 'tootaja_id' }
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch executors', error: err.message });
  }
};

exports.addExecutor = async (req, res) => {
  try {
    const { teenused_list_id, tootaja_id, teostamise_kuupaev, kommentaar } = req.body;

    const teostaja = await TeenusedTeostajad.create({
      teenused_list_id,
      tootaja_id,
      teostamise_kuupaev,
      kommentaar
    });

    res.status(201).json({ message: 'Executor added', teostaja });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add executor', error: err.message });
  }
};
