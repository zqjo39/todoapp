const {sequelize} = require("../models/index");
const {QueryTypes} = require("sequelize");
const {Todo} = require('../models/index')

module.exports.homeRoute = async function(req, res, next) {
    let toDoItems = await Todo.findAll();
    res.render('index', {toDoItems});
};

module.exports.renderAddForm = function(req, res) {
    res.render('create_todo');
};

module.exports.addNewItem = async function(req, res) {
    await Todo.create({
        description: req.body.description
    });
    res.redirect('/')
};

module.exports.markItemAsComplete = async function(req, res) {
    await Todo.update({completed: true}, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/')
};

module.exports.markItemAsIncomplete = async function(req, res) {
    await Todo.update({completed: false}, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/')
};

module.exports.deleteItem = async function(req, res) {
    await Todo.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/')
};

module.exports.renderEditForm = async function(req, res) {
    let todo = await Todo.findByPk(req.params.id);
    res.render('edit_todo', {
        item: {
            description: todo.description,
            id: req.params.id
        }
    });
};

module.exports.updateItem = async function(req, res) {
    await Todo.update({description: req.body.description}, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/')
};