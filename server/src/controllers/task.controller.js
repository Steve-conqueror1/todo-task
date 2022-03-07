const genericCrud = require('./generic.controller');
const { Task } = require('../models');

module.exports = {
  ...genericCrud(Task),
    async getAll(req, res) {
    const limit = req.query.limit || 3
      const pageNumber = req.query.page || 1
      const count = await Task.countDocuments()
      const sort ={}
      let options = {}
      if(req.query.sortBy && req.query.OrderBy){
        sort[req.query.sortBy] = req.query.OrderBy === 'desc'? -1 :1.
        options = {sort: [[req.query.sortBy, req.query.OrderBy]]}
      }
    try {
      const data =await Task.find()
          .sort({...sort})
          .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * limit ) : 0 )
          .limit(limit)
          .then(items => {
            return items;
      })
      return res.status(200).json({data: data, documentCount: count, totalPages: Math.ceil(count/limit)})
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
