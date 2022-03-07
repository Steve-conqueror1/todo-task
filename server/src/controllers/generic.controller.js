const boom = require('boom');

const genericApi = (model) => ({
  async get(req, res) {
    const { id } = req.params;
    try {
      const item = await model.findById(id);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send({error: err});
    }
  },

  async getAll(req, res) {
    try {
      const items = await model.find();
      return res.status(200).send(items)
    } catch (err) {
      return res.status(400).send({error: err});
    }
  },

  async create(req, res) {
    const body = req.body;
    try {
      const item = new model(body);
      const newItem = await item.save();
      return res.status(201).send(newItem);
    } catch (err) {
      return res.status(400).send({error: err});
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const body = req.body;
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send({error: err});
    }
  },
});

module.exports = genericApi;
