const express = require('express');
const server = express();
const actionDB = require('./data/helpers/actionModel');
const projectDB = require('./data/helpers/projectModel');

server.use(express.json());

server.get('/', (req, res) => {
  actionDB
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err =>
      res.status(500).json({ message: 'Cannot retrieve action.', err })
    );
});

server.get('/', (req, res) => {
  projectDB
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err =>
      res.status(500).json({ message: 'Cannot retrieve project.', err })
    );
});

server.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDB.get(id).then(project => {
    res.status(200).json(project);
  });
});

server.post('/', (req, res) => {
  projectDB
    .insert(req.body)
    .then(projectData => {
      res.status(201).json(projectData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'There was an error creating the project.', err });
    });
});

server.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projectDB
    .update(id, changes)
    .then(project => {
      res.status(200).json({ message: 'Project updated successfully.' });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'There was an error modifying your project.', err });
    });
});

server.delete('/:id', (req, res) => {
  projectDB.remove(req.params.id).then(project => {
    res.status(200).json({ message: 'Project deleted successfully.' });
  });
});

server.listen(9000, () => console.log('server on port 9000'));
