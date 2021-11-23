const { Router } = require('express');
const projectControllers = require('../controllers/projectControllers');

const router = Router();

// post
router.post('/newProject', projectControllers.createProject_post);
// get
router.get('/getProjects', projectControllers.allProjects_get);

// put
router.put('/updateProject', projectControllers.updateProject_put);

module.exports = router;
