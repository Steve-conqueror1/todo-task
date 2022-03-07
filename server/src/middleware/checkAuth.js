const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({authorization: "Authorization failed"})
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        req.userData = {userType: decodedToken.userType}
        next()
    } catch (error){
         return res.status(401).json({authorization: "Authorization failed"})
    }
}

