const router = require('express').Router();
const todoController = require('../controller/todo');
const userController = require('../controller/Users');
const profileController = require('../controller/Profile');

router.post('/Users/create',userController.create);
//insert-create
router.post('/todo/create',todoController.create);
//find
router.get('/todo',todoController.index);
//update
router.put('/todo/update/:id',todoController.update);
//Delete
router.delete('/todo/delete/:id',todoController.delete);

module.exports = router;

