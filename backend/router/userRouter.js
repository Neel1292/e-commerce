const express = require('express');
const router = express.Router();
const userController =  require('../controller/userController.js');
const paymentController = require('../controller/paymentController.js');
const { authUser } = require('../middleware/authToken.js');

router.get('/all', authUser, userController.getUsers)
router.post('/signup', userController.signup)
router.get('/login', function(req, res){
    res.send("welcome to login page")
})
router.post('/login', userController.login);
router.post('/edit/:id', authUser, userController.update);
router.post('/add', authUser, userController.addUser);
router.delete('/delete/:id', authUser, userController.deleteUser);

// paymetn gateway
router.post('/checkout', authUser, paymentController.checkOut);

module.exports = router;