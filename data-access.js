const knex = require('knex');
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

module.exports = {
    getProjects,
    addProject,
    getResources,
    // addResource,
    // getTasks,
    // addTask
}

function getProjects(){
    return db('project')
}

function addProject(project){
    return db('project')
        .insert(project)
        .then(ids => ({id: ids[0]}))
}

function getResources(id){
    return db('resource')
        .join('project_resource', 'resource.id', 'resource_id')
        .join('project','project.id', 'project_id')
        .select('resource_name', 'description')
        .where('project_id', Number(id))
}