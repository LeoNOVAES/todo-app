const express = require("express");
const router = express.Router();
const middleAuth = require("./middlewares/Auth");
const UsersController = require("./controllers/UsersController");
const ProjectsController = require("./controllers/ProjectsController");
const TasksController = require("./controllers/TasksController");

//users
router.post('/api/user', UsersController.store);
router.post('/api/auth', UsersController.autentic);
router.get('/api/user/:id', middleAuth, UsersController.index);

//projects
router.post('/api/project', middleAuth, ProjectsController.store);
router.get('/api/projects', middleAuth, ProjectsController.indexAllByUser);
router.put("/api/project/:id", middleAuth, ProjectsController.update);
router.delete("/api/project/:id", middleAuth, ProjectsController.delete);

//tasks
router.post('/api/task', middleAuth, TasksController.store);
router.put("/api/task/:id", middleAuth, TasksController.update);
router.delete("/api/task/:id", middleAuth ,TasksController.delete);

module.exports = router;
