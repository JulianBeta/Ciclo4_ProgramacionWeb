const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const { checkAuth } = require('../utils/checkAuth')

const router = Router()

// post
router.post('/signup', userControllers.signup_post)
router.post('/login', userControllers.login_post)

// get
router.get('/allUsers', checkAuth, userControllers.allUsers_get)

// put
router.put('/updateUser', userControllers.updateUser_put)

module.exports = router
