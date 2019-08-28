const router = require('express').Router();
const Projects = require('../models/projectModel');

const findProjects = (req, res) => {
    Projects.findProjects()
        .then(response => {
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({Error: "Cannot find any projects"});
            }
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
}

const findProjectById = (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    Projects.findProjects(id).then(response => {
            res.status(200).json(response);
        })
        .catch(err =>{
            res.status(500).json({Error: err.message})
        });
    }

const findProjectTasks = (req, res) => {
    const { id } = req.params;
    console.log(id)
    Projects.findProjectTasks(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
}

const findProjectResources = (req, res) => {
    const { id } = req.params;
    console.log(id)
    Projects.findProjectResources(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
}

const addProjects = (req, res) => {
    const { name, description, completed } = req.body;
    if(!name || !description || completed) {
        res.status(400).json({Error: "POST request must have a body"})
    }
    Projects.addProjects({name, description, completed})
        .then(response => {
            console.log("resp", response)
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
}

const addTasks = (req, res) => {
    const { body } = req;
    if(!body) {
        res.status(400).json({Error: "POST request must have a body"})
    }
    Projects.addProjects(body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
}

const addResources = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    if(!body) {
        res.status(400).json({Error: "POST request must have a body"})
    }
    Projects.addResources(body, id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
}



router.route('/')
    .get(findProjects)
    .post(addProjects)
router.route('/:id')
    .get(findProjectById)
router.route('/:id/tasks')
    .get(findProjectTasks)
    .post(addTasks)
router.route('/:id/resources')
    .get(findProjectResources)
    .post(addResources)






module.exports = router;