const knex = require('knex');
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

module.exports = {
    getProjects,
    findProjectById,
    addProject,
    getResources,
    addResource,
    // getTasks,
    // addTask
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

function getResources(project_id){
    return db('project_resource')
        .join('resource', 'resource.id', 'resource_id')
        .join('project','project.id', 'project_id')
        .select('resource.resource_name', 'resource.description')
        .where('project_id', Number(project_id))
}

function addResource(resource, project_id){
    return db('resource')
        .join('project_resource', 'resource.id', 'project_resource.resource_id')
        .insert(resource)
        .where('project_resource.project_id', project_id)
        .then(ids => ({ id: ids[0] }));
}