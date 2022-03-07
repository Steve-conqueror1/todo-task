const { InvalidToken } = require('../models');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const isInvalidToken = await InvalidToken.findOne({token})
    if(!token || isInvalidToken){
        return res.status(401).json({unauthorized: "You need to login to perform this action"})
    }
    next()
}
