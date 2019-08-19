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
    Projects.findProjectById(id)
        .then(response => {
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({Error: "id not found"})
            }
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        })
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



router.route('/')
    .get(findProjects)
router.route('/:id')
    .get(findProjectById)
router.route('/:id/tasks')
    .get(findProjectTasks)
router.route('/:id/resources')
    .get(findProjectResources)






module.exports = router;