const express = require('express');
const router = express.Router()
const ProductController = require('../controllers/ProductController.js')
const {authMiddleware , authUserMiddleware} = require ('../middleware/authMiddleware.js')

router.post('/createProduct' , ProductController.createProduct)
router.put('/update/:id' , authMiddleware ,ProductController.updateProduct)
router.get('/detailProduct/:id'  ,ProductController.detailProduct)
router.get('/allProduct'  ,ProductController.allProduct)
router.delete('/deleteProduct/:id'  ,ProductController.deleteProduct)


module.exports = router
