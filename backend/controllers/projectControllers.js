const Project = require('../models/Project')

module.exports.createProject_post = async (req, res) => {
  const { title, generalObjectives, specificObjectives, author, budget, participants } = req.body
  const status = 'pending'
  const phase = 'development'

  try {
    const project = await Project.create({
      title,
      generalObjectives,
      specificObjectives,
      author,
      participants,
      budget,
      status,
      phase,
    })
    res.status(201).json({ data: project })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while creating the project')
  }
}

module.exports.allProjects_get = async (req, res) => {
  try {
    const projects = await Project.find({}).populate({ path: 'participants.user' })
    res.send({ data: projects })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while getting all projects')
  }
}

/*
  Only updates
  title, generalObjectives, specificObjectives, budget
*/
module.exports.updateProject_put = async (req, res) => {
  try {
    const { _id } = req.body
    const project = await Project.findById(_id)
    if (!project) {
      throw new Error('Project not found')
    }
    const updatedProject = await Project.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    })
    res.status(200).json({ data: updatedProject })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while updating this project')
  }
}

// module.exports.deleteProject_delete = async (req, res) => {};

module.exports.pushParticipant = async (req, res) => {
  try {
    const { _id, user } = req.body
    const status = 'Pending'
    const project = await Project.findById(_id)
    if (!project) {
      throw new Error('Project not found')
    }
    console.log(JSON.stringify(project.participants, null, 4))
    const exist = project.participants.find((p) => {
      console.log(p.user.toString(), user)
      return p?.user.toString() === user
    })
    console.log(exist)
    if (exist) {
      res.status(200).json({ data: 'user already registered' })
      return
    }

    project.participants.push({ user, status })
    await project.save()

    res.status(200).json({ data: 'Added' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while updating this project')
  }
}

module.exports.updateParticipant = async (req, res) => {
  try {
    const { _id, user, status } = req.body
    const project = await Project.findById(_id)
    if (!project) {
      throw new Error('Project not found')
    }
    console.log(JSON.stringify(project.participants, null, 4))
    const exist = project.participants.find((p) => {
      console.log(p.user.toString(), user)
      return p?.user.toString() === user
    })
    console.log(exist)
    if (exist) {
      res.status(200).json({ data: 'user already registered' })
      return
    }

    project.participants.push({ user, status })
    await project.save()

    res.status(200).json({ data: 'Added' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while updating this project')
  }
}
