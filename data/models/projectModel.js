const db = require('../dbConfig');

const truthy = (obj, key) => {
    return obj[key] ? true : false;
}

const getTasks = (id) => {
    return db('tasks').where({'tasks.projects_id': id})
                    .then(tasks => {
                        const mapped = tasks.map(task => {
                            return task;
                        })
                        return mapped.filter(item => {
                            item.id  === id;
                        });
                    })
}



const findProjects = (id) => {
    let query = db('projects')
        .join('tasks', 'tasks.projects_id', 'projects.id')
        .join('resources', 'resources.projects_id', 'projects.id')
        .select('projects.id', 'projects.name as projectName', 'projects.description as projectDesc', 'projects.completed as projectsComp','resources.name as resourcesName', 'resources.description as resourcesDesc','tasks.description as tasksDesc','tasks.notes as tasksNotes', 'tasks.completed as tasksComp', 'tasks.projects_id as projectId')

        if(id) {
            return query.where({"projects.id": id})
                .then(results => {
                    let tasks = [];
                    let resources = [];
                    let resource = '';
                    let task = ''
                    let newObj = {};
                    results.forEach((result) => {
                        task = result.tasksDesc;
                        let taskObj = { task, notes: result.tasksNotes, completed: truthy(result, "completed")}
                        if(result.tasksDesc !== task){
                            tasks = [...tasks, taskObj];
                        } else {
                            tasks = [taskObj]
                        }
                        if(result.resourcesName !== resource) {
                            resource = result.resourcesName;
                            let resourceObj = {name: resource, description: result.resourcesDesc}
                            resources = [...resources, resourceObj]
                        }
                        newObj = {name: result.projectName, description: result.projectDesc, completed: truthy(result, "completed"), tasks, resources};
                    })
                    return newObj;
                })
        }
        return query.then(results => {
            let tasks = [];
            let resources = [];
            let resource = '';
            let task = '';
            let newObj = {};
            const mapped = results.map((result) => {
                task = result.tasksDesc;
                let taskObj = { task, notes: result.tasksNotes, completed: truthy(result, "completed")}
                if(result.tasksDesc !== task){
                    tasks = [...tasks, taskObj];
                } else {
                    tasks = [taskObj]
                }
                if(result.resourcesName !== resource) {
                    resource = result.resourcesName;
                    let resourceObj = {name: resource, description: result.resourcesDesc}
                    resources = [...resources, resourceObj]
                }
                newObj = {name: result.projectName, description: result.projectDesc, completed: truthy(result, "completed"), tasks, resources};
                return newObj;
            })
            return mapped;
        })
    }
                
                //getTasks
            //     getTasks(result.projectId)
            //             .then(response => {
            //                 console.log(response);
            //             })   
            // })





module.exports = {
    findProjects
    // addProjects,
    //updateProject ('/projects/:id')
    //deleteProject ('/projects/:id')
    // findProjectTasks,
    // addTasks,
    //findProjectTaskById ('/projects/:id/tasks/:taskId')
    //updateTask ('/projects/:id/tasks/:taskId')
    //deleteTask ('/projects/:id/tasks/:taskId')
    // findProjectResources,
    // addResources
    //findProjectResourceById ('/projects/:id/resources/:id')
    //updateProjectResource ('/projects/:id/resources/:id')
    //deleteProjectResource ('/projects/:id/resources/:id')



}