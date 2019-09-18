const express = require("express");
const router = express.Router();
const UsersController = require("./controllers/UsersController");
const EventsController = require("./controllers/EventsController");

//users
router.post('/api/user', UsersController.store);
router.post('/api/auth', UsersController.autentic);
router.use(UsersController.middleAuth);
router.get('/api/user', UsersController.index);
router.get('/api/users', UsersController.indexAll);
router.put('/api/user', UsersController.update);
router.delete('/api/user', UsersController.delete);

//events
router.post('/api/event', EventsController.store);
router.get('/api/guests', EventsController.listGuests);
router.get('/api/accept', EventsController.acceptInvite);
router.get('/api/events', EventsController.indexAll);
router.get('/api/event', EventsController.index);
router.get('/api/events/organizer', EventsController.indexOrganizer);
router.put('/api/event', EventsController.update);
router.delete("/api/event", EventsController.delete);

module.exports = router;
