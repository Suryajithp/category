const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controller')



router.post('/', userController.addCategory)

router.get('/category', userController.getCategory)

router.post('/subcategory', userController.addSubCategory)

router.get('/subcategory/:id', userController.getSubCategory)

router.post('/addproduct', userController.addPost)

router.get('/productlist', userController.getAllPost)

router.get('/product/:id', userController.getPost)

router.get('/subproduct/:id', userController.getSubPost)


module.exports = router;