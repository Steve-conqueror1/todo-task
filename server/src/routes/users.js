const router = require('express-promise-router')();

const { user } = require('../controllers');

router.route('/:id').get(user.get);
router.route('/').get(user.getAll);
router.route('/').post(user.create);
router.route('/login').post(user.login);

module.exports = router;
