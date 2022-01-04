const userModel = require('../model/userModel');

const sendToken = require('../utils/jwtToken');

exports.register = async(req, res, next) => {
    
    const { name, email, password } = req.body;
    
    const user = await userModel.create({
        name,
        email,
        password
    })
    sendToken(user, 200, res);
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        res.status(400).json({
            success: false,
            message: `Please enter email or password`
        })
    }

    const user = await userModel.findOne({ email }).select('+password');

    if(!user){
        res.status(401).json({
            success: false,
            message: `Your email or password is invalid`
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        res.status(401).json({
            success: false,
            message: `Your email or password is invalid`
        })
    }

    sendToken(user, 200, res);
}

exports.logout = async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: `Logout successfully`
    })
}

exports.getUsers = async (req, res, next) => {
    const users = await userModel.find();
    res.status(200).json({
        success: true,
        count : users.length,
        users
    })
}

exports.deleteUser = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if(!user){
        res.status(401).json({
            success: false,
            message : `Cannot find user by ${req.params.id}`
        })
    }
    await user.remove();

    res.status(200).json({
        success: true
    })
}