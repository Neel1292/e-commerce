const express = require('express'),
    router = express.Router(),
    itemController =  require('../controller/itemController.js'),
    path = require('path'),
    multer = require('multer');
const { authUser } = require('../middleware/authToken.js')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getOneItem);
router.post('/add', authUser, upload.single('item_image'), itemController.addItem);
router.post('/edit/:id', authUser, upload.single('item_image'), itemController.updateItem);
router.delete('/delete/:id', authUser, itemController.deleteItem);

module.exports = router;