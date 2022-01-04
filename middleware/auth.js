const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

exports.isAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        res.status(401).json({
            success : false,
            message : `Login first to access this route`
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);
    next();
}

exports.authorizationRole = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            res.status(403).json({
                success : false,
                message : `Your ${req.user.role} role is not allowed to access this route`
            })
        }
        next();
    }
}