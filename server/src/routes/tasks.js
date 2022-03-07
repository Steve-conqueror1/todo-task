const router = require('express-promise-router')();

const { task } = require('../controllers');
const checkPermission = require('./../middleware/checkPermission')

router.route('/:id').get(task.get);
router.route('/').get(task.getAll);
router.route('/').post(task.create);

router.use(checkPermission)
router.route('/:id').put(task.update);

module.exports = router;
