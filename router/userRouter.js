const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/', userController.getUsers)
    .get('/:id', userController.getUsers)
    .post('/', userController.addNewUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)


module.exports = router