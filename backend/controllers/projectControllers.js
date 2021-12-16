const Project = require('../models/Project')

module.exports.new = async (req, res) => {
  const { title, generalObjectives, specificObjectives, author, budget } = req.body
  try {
    const project = await Project.create({
      title,
      generalObjectives,
      specificObjectives,
      author,
      participants: [],
      budget,
      status: 'Pending',
      phase: 'Development',
    })
    res.status(201).json({ data: project })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while creating the project')
  }
}

module.exports.projects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate({ path: 'participants.user' }).populate({ path: 'commits.user' })
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
module.exports.update = async (req, res) => {
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

module.exports.newParticipant = async (req, res) => {
  try {
    const { _id, user } = req.body
    const status = 'Pending'
    const project = await Project.findById(_id)
    if (!project) {
      throw new Error('Project not found')
    }
    const exist = project.participants.find((p) => {
      return p?.user.toString() === user
    })
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

module.exports.updateParticipantStatus = async (req, res) => {
  try {
    const { _id, user, status } = req.body
    const project = await Project.findById(_id)
    if (!project) {
      throw new Error('Project not found')
    }
    const exist = project.participants.find((p) => {
      return p?.user.toString() === user
    })
    if (!exist) {
      res.status(200).json({ data: 'User does not exist' })
      return
    }
    exist.status = status
    await project.save()
    res.status(200).json({ data: 'Status updated' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while updating this project')
  }
}

module.exports.newCommit = async (req, res) => {
  try {
    const { _id, user, commit } = req.body
    const project = await Project.findById(_id)
    if (!project) {
      throw new Error('Project not found')
    }
    project.commits.push({ user, commit, observation: '' })
    await project.save()
    res.status(200).json({ data: project })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while creating the commit')
  }
}
