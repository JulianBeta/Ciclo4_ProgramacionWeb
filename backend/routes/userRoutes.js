const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const { checkAuth } = require('../utils/checkAuth')

const router = Router()

// post
router.post('/user/signup', userControllers.signup)
router.post('/user/login', userControllers.login)

// get
router.get('/user/users', checkAuth, userControllers.users)

// put
router.put('/user/update', checkAuth, userControllers.update)

module.exports = router
