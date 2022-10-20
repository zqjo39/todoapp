const {sequelize} = require("../models/index");
const {QueryTypes} = require("sequelize");

module.exports.homeRoute = async function(req, res, next) {
    let toDoItems = await sequelize.query('select * from todo', {type: QueryTypes.SELECT});
    res.render('index', {toDoItems});
};

module.exports.renderAddForm = function(req, res) {
    res.render('create_todo');
};

module.exports.addNewItem = async function(req, res) {
    await sequelize.query('insert into todo (description) values (:description)', {
        type: QueryTypes.INSERT,
        replacements: {
            description: req.body.description
        }
    });
    res.redirect('/')
};

module.exports.markItemAsComplete = async function(req, res) {
    await sequelize.query('update todo set completed = true where id = :id', {
        type: QueryTypes.UPDATE,
        replacements: {
            id: req.params.id
        }
    });
    res.redirect('/')
};

module.exports.markItemAsIncomplete = async function(req, res) {
    await sequelize.query('update todo set completed = false where id = :id', {
        type: QueryTypes.UPDATE,
        replacements: {
            id: req.params.id
        }
    });
    res.redirect('/')
};

module.exports.deleteItem = async function(req, res) {
    await sequelize.query('delete from todo where id = :id', {
        type: QueryTypes.DELETE,
        replacements: {
            id: req.params.id
        }
    });
    res.redirect('/')
};

module.exports.renderEditForm = async function(req, res) {
    const results = await sequelize.query('select * from todo where id = :id', {
        type: QueryTypes.SELECT,
        replacements: {
            id: req.params.id
        }
    });
    const item = results[0];
    console.log(results);
    res.render('edit_todo', {item})
};

module.exports.updateItem = async function(req, res) {
    await sequelize.query('update todo set description = :description where id = :id', {
        type: QueryTypes.UPDATE,
        replacements: {
            id: req.params.id,
            description: req.body.description
        }
    });
    res.redirect('/')
};