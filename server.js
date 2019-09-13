const express = require('express');

const server = express();

const db = require('./data-access')
server.use(express.json());

//GET PROJECTS
server.get('/api/projects', (req,res) => {
    db.getProjects()
    .then(projects => {
        res.status(200).json(projects);
        })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get projects' });
    });
})

//ADD A PROJECT
server.post('/api/projects', (req,res) => {
    const projectData = req.body

    db.addProject(projectData)
    .then(project => {
        res.status(201).json(project);
        })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add project' });
    });
})

//GET RESOURCES
server.get('/api/projects/:id/resources', (req,res) => {
    const {id} = req.params

    db.getResources(id)
    .then(resources => {
    if (resources.length) {
        res.json(resources);
      } else {
        res.status(404).json({ message: 'Could not get resources for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
})













module.exports = server;