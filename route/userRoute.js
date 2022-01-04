const express = require('express');
const router = express.Router();

const { register,
        login,
        getUsers,
        deleteUser,
        logout } = require('../controller/authController');



const { isAuth, authorizationRole } = require('../middleware/auth');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/admin/getuser').get(isAuth, authorizationRole('Admin'), getUsers);
router.route('/admin/deleteuser/:id').delete(isAuth, authorizationRole('Admin'), deleteUser)
router.route('/user/logout').get(isAuth, logout);



module.exports = router;