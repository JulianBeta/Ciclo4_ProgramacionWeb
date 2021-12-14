const { Router } = require('express')
const projectControllers = require('../controllers/projectControllers')
const { checkAuth } = require('../utils/checkAuth')

const router = Router()

// post
router.post('/project/new', checkAuth, projectControllers.new)
// get
router.get('/project/projects', checkAuth, projectControllers.projects)

// put
router.put('/project/update', checkAuth, projectControllers.update)

// add new participant
router.put('/project/newParticipant', projectControllers.newParticipant)

// update participant status
router.put('/project/updateStatus', projectControllers.updateParticipantStatus)

module.exports = router
