const db = require('../dbConfig');

const truthy = (obj, key) => {
    return obj[key] ? true : false;
}
module.exports = {
    findProjects,
    findProjectById,
    addProjects,
    //updateProject ('/projects/:id')
    //deleteProject ('/projects/:id')
    findProjectTasks,
    addTasks,
    //findProjectTaskById ('/projects/:id/tasks/:taskId')
    //updateTask ('/projects/:id/tasks/:taskId')
    //deleteTask ('/projects/:id/tasks/:taskId')
    findProjectResources,
    addResources
    //findProjectResourceById ('/projects/:id/resources/:id')
    //updateProjectResource ('/projects/:id/resources/:id')
    //deleteProjectResource ('/projects/:id/resources/:id')



}

function findProjects() {
    console.log(db('projects'));
    return db('projects')
                .then(results => {
                    results.forEach(result => {
                        return result.completed = truthy(result, "completed");
                    })
                    return results;
                })
}

function findProjectById(id) {
   return db('projects').where({id});
}

function findProjectTasks(id) {
    const projects = findProjectById(id);
    if(projects) {
        return db('tasks')
            .join('projects', 'projects.id', 'tasks.projects_id' )
            .select('projects.id as projectid', 'projects.name as projectName', 'projects.description as projectsDesc', 'tasks.description as tasksDesc','tasks.notes as tasksNotes', 'tasks.completed as tasksCompleted')
            .where({projectid: id})
            .orderBy('projects.id')
            .then(results => {
                let tasksDesc = [];
                let projectName = '';
                let projectDesc = '';
                let id = null;
                results.forEach(result => {
                    projectName = result.projectName;
                    projectDesc = result.projectDesc;
                    id = result.projectid;
                    if(result.projectName === projectName) {
                        tasksDesc.push({description: result.tasksDesc, notes: result.tasksNotes, completed: truthy(result, "completed")})
                    }
                })
                return {id, name: projectName, description: projectDesc, tasks: tasksDesc}
            })
    } 
}

function findProjectResources(id) {
    const projects = findProjectById(id);
    if(projects) {
        return db('resources')
            .join('projects', 'projects.id', 'resources.projects_id' )
            .select('projects.id as projectid', 'projects.name', 'projects.description', 'resources.name as resourcesName','resources.description as resourcesDesc')
            .where({projectid: id})
            .orderBy('projects.id')
            .then(results => {
                let resourcesDesc = [];
                let name = '';
                let description = '';
                let id = "";
                console.log(description,"hello", name)
                results.forEach(result => {
                    console.log("rrrrrrrreeeessssuuuuullllllttttt", result);
                    name = result.name;
                    description = result.description;
                    id = result.projectid;
                    if(result.name === projectName) {
                        resourcesDesc.push({name: result.resourcesName, description: result.resourcesDesc})
                    }
                })
                return {id, name, description, resources: resourcesDesc}
            })
            .catch(err => {
                res.status(500).json({Error: err.message})
            })
    } 
}

function addProjects(project) {
    console.log(project);
    const post = db('projects').insert({name: project.name, description: project.description, completed: project.completed || false});
    return post;
}

function addResources(resource, id) {
    const post = db('resources').insert({name: resource.name, description: resource.description, project_id: id});
    return post;
}

function addTasks(task) {
    const post = db('tasks').insert({description: task.description, notes: task.notes, completed: task.completed || false});
    return post;
}