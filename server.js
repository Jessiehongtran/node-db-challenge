const express = require('express');

const server = express();

const db = require('./data-access')
server.use(express.json());

//GET PROJECTS
server.get('/api/projects', (req,res) => {
    db.getProjects()
    .then(projects => {
        projects.map(eachproject => eachproject.completed = eachproject.completed === 1 ? true : false)
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


//ADD A RESOURCE
server.post('/api/projects/:id/resources', (req,res) => {
  const resourceData = req.body;
  const {id} = req.params;

  db.findProjectById(id)
  .then(project => {
  if (project) {
    db.addResource(resourceData, id)
    .then(newResource => {
      console.log('here resource_id', newResource.id)
      console.log('here project_id', id)
      const project_id = parseInt(id);
      const resource_id = parseInt(newResource.id);
      res.status(201).json(newResource);
      db.linkResourceToProject(project_id, resource_id)
    })
    .catch(err => {
      res.status(501).json({ message: 'Fail to add resource' })
    })
  } else {
    res.status(404).json({ message: 'No resource to add.' })
  }
})
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


//GET TASKS
server.get('/api/projects/:id/tasks', (req,res) => {
    const {id} = req.params

    db.getTasks(id)
    .then(data => {
    if (data.length) {
        res.json(data);
      } else {
        res.status(404).json({ message: 'Could not get tasks for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
})

//ADD A TASK
//once adding a task, please remember to add project_id to link with the project
server.post('/api/projects/:id/tasks', (req,res) => {
    const taskData = req.body;
    const {id} = req.params;

    db.findProjectById(id)
    .then(task => {
    if (task) {
      db.addTask(taskData, id)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        res.status(501).json({ message: 'Fail to add task' })
      })
    } else {
      res.status(404).json({ message: 'Not proper task to add.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'There is no project to add the task' });
  });
})









module.exports = server;