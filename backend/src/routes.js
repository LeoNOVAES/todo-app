const express = require("express");
const router = express.Router();
const UsersController = require("./controllers/UsersController");
const EventsController = require("./controllers/EventsController");


//events
router.post('/api/event', EventsController.store);
router.get('/api/guests', EventsController.listGuests);
router.get('/api/accept', EventsController.acceptInvite);
router.get('/api/events', EventsController.indexAll);
router.get('/api/event', EventsController.index);

//users
router.post('/api/user', UsersController.store);
router.post('/api/auth', UsersController.autentic);
router.use(UsersController.middleAuth);
router.get('/api/user/:id', UsersController.indexOne);
router.get('/api/users/', UsersController.indexOne);

module.exports = router;
