const models = require('../models');

const { Project } = models;

const makerPage = (req, res) => res.render('app');

//Retrieves Projects from server
const getProjects = (req, res) => Project.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }
  return res.json({ Projects: docs });
});

//Handles create project request
const makeProject = async (req, res) => {
  if (!req.body.name || !req.body.desc) {
    return res.status(400).json({ error: 'Both name and description are required!' });
  }

  const projData = {
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
    owner: req.session.account._id,
  };

  try {
    const newProj = new Project(projData);
    await newProj.save();
    return res.status(201).json({ name: newProj.name, desc: newProj.desc });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Project already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

module.exports = {
  makerPage,
  makeProject,
  getProjects,
};
