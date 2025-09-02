const express = require('express');
const router = express.Router()
const userContrller = require('../controllers/UserContrller')
const {authMiddleware , authUserMiddleware} = require ('../middleware/authMiddleware.js')

router.post('/log-up' , userContrller.createUser)
router.post('/login' , userContrller.loginUser)
router.put('/update-user/:id' , userContrller.UpdateUser)
router.delete('/delete-user/:id' ,authMiddleware, userContrller.DeleteUser)
router.get('/getAll' ,authMiddleware, userContrller.getAllUser)
router.get('/getDetail/:id', authUserMiddleware , userContrller.getDetail)
router.post('/refreshToken' , userContrller.refreshToken)


module.exports = router
