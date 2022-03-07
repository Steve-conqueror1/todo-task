const router = require('express-promise-router')();

const { invalidToken } = require('../controllers');
router.route('/').post(invalidToken.create);
module.exports = router;