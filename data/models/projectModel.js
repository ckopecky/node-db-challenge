const db = require('../dbConfig');

const truthy = (obj, key) => {
    return obj[key] ? true : false;
}
module.exports = {
    findProjects,
    findProjectById,
    //postProjects ('/projects)
    //updateProject ('/projects/:id')
    //deleteProject ('/projects/:id')
    findProjectTasks,
    //postProjectTasks ('/projects/:id/tasks)
    //findProjectTaskById ('/projects/:id/tasks/:taskId')
    //updateTask ('/projects/:id/tasks/:taskId')
    //deleteTask ('/projects/:id/tasks/:taskId')
    findProjectResources 
    //('/projects/:id/resources)
    //findProjectResourceById ('/projects/:id/resources/:id')
    //updateProjectResource ('/projects/:id/resources/:id')
    //deleteProjectResource ('/projects/:id/resources/:id')



}

function findProjects() {
    console.log(db('projects'));
    return db('projects')
                .then(results => {
                    results.map(result => {
                        return result.completed = truthy(result, "completed");
                    })
                    return results;
                })
}

function findProjectById(id) {
    return db('projects')
        .join('resources_projects', 'resources_projects.projects_id', 'projects.id' )
        .join('resources', 'resources_projects.resources_id', 'resources.id')
        .join('tasks', 'tasks.projects_id', 'projects.id')
        .select('projects.id as projectId', 'projects.name as projectName', 'projects.description as projectDesc', 'resources.name as resourceName', 'resources.description as resourceDesc', 'tasks.description as taskDesc', 'tasks.notes as tasksNotes', 'tasks.completed as tasksCompleted')
        .where({projectId: id})
        .then(results => {
            const resources = [];
            let projectName = '';
            let projectDesc = '';
            let id = null;
            let taskObj = {};
            let task = '';
            let tasks = [];
            results.forEach((result, index) => {
                id = result.projectId;
                projectName = result.projectName;
                projectDesc = result.projectDesc;
                if(result.projectName === projectName) {
                    resources.push({name: result.resourceName, desc: result.resourceDesc});
                    if(result.taskDesc !== task) {
                        task = result.taskDesc;                        
                        taskObj = {task, completed: result.tasksCompleted, notes: result.tasksNotes}
                    }
                    tasks.push(taskObj);
                }
            })
            return {id, projectName, projectDesc, resources, tasks}
        })
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
            .select('projects.id as projectid', 'projects.name as projectName', 'projects.description as projectDesc', 'resources.name as resourcesName','resources.description as resourcesDesc')
            .where({projectid: id})
            .orderBy('projects.id')
            .then(results => {
                let resourcesDesc = [];
                let projectName = '';
                let projectDesc = '';
                let id = null;
                results.forEach(result => {
                    projectName = result.projectName;
                    projectDesc = result.projectDesc;
                    id = result.projectid;
                    if(result.projectName === projectName) {
                        resourcesDesc.push({name: result.resourcesName, description: result.resourcesDesc})
                    }
                })
                return {id, name: projectName, description: projectDesc, resources: resourcesDesc}
            })
    } 
}