const Project = require('../models/Project');

module.exports.createProject_post = async (req, res) => {
  const status = 'pending';
  const phase = 'development';

  try {
    const project = await Project.create({
      ...req.body,
      status,
      phase,
    });
    res.status(201).json({ data: project });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error while creating the project');
  }
};

module.exports.allProjects_get = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send({ data: projects });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error while getting all projects');
  }
};

/*
  Only updates
  title, generalObjectives, specificObjectives, budget
*/
module.exports.updateProject_put = async (req, res) => {
  try {
    const { _id } = req.body;
    const project = await Project.findById(_id);
    if (!project) {
      throw new Error('Project not found');
    }
    const updatedProject = await Project.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });
    res.status(200).json({ data: updatedProject });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error while updating this project');
  }
};

// module.exports.deleteProject_delete = async (req, res) => {};
