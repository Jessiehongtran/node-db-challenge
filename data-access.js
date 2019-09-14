const knex = require('knex');
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

module.exports = {
    getProjects,
    findProjectById,
    addProject,
    getResources,
    addResource,
    linkResourceToProject,
    getTasks,
    addTask
}

function getProjects(){
    return db('project')
}

function findProjectById(id){
    return db('project').where({id: Number(id)})
}

function addProject(project){
    return db('project')
        .insert(project)
        .then(ids => ({id: ids[0]}))
}


function addResource(resource, project_id){
    return db('resource')
        .join('project_resource', 'resource.id', 'project_resource.resource_id')
        .insert(resource)
        .where('project_resource.project_id', project_id)
        .then(ids => ({ id: ids[0] }))
        
}
function linkResourceToProject(project_id, resource_id){
    return db('project_resource')
        .insert({project_id: project_id, resource_id: resource_id})
     
}

function getResources(project_id){
    return db('project_resource')
        .join('resource', 'resource.id', 'resource_id')
        .join('project','project.id', 'project_id')
        .select('resource.resource_name', 'resource.description')
        .where('project_id', Number(project_id))
}

function getTasks(project_id){
    return db('task')
        .join('project', 'project.id', 'task.project_id')
        .select('task.description', 'task.completed', 'project.project_name', 'project.description as project_description')
        .where('task.project_id', Number(project_id))
}

function addTask(task, project_id){
    return db('task')
        .join('project', 'project.id', 'task.project_id')
        .insert(task)
        .where('task.project_id', project_id)
        .then(ids => ({ id: ids[0] }));
} 


