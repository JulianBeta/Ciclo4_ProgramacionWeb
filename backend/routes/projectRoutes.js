const { Router } = require('express')
const projectControllers = require('../controllers/projectControllers')
const { checkAuth } = require('../utils/checkAuth')

const router = Router()

// post
router.post('/newProject', checkAuth, projectControllers.createProject_post)
// get
router.get('/getProjects', checkAuth, projectControllers.allProjects_get)

// put
router.put('/updateProject', checkAuth, projectControllers.updateProject_put)

// pushUser
router.put('/pushUser', projectControllers.pushParticipant)

module.exports = router
