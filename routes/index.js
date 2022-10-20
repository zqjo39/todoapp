var express = require('express');
var router = express.Router();
const toDoController = require("../controllers/todo_controller.js");

/* GET home page. */
router.get('/', toDoController.homeRoute);

router.get('/add', toDoController.renderAddForm);

router.post('/add', toDoController.addNewItem);

router.get('/complete/:id', toDoController.markItemAsComplete);

router.get('/incomplete/:id', toDoController.markItemAsIncomplete);

router.get('/delete/:id', toDoController.deleteItem);

router.get('/edit/:id', toDoController.renderEditForm);

router.post('/edit/:id', toDoController.updateItem);

module.exports = router;
