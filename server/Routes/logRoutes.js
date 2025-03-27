const express = require('express');
const logController = require('../controller/logComntroller');
const authenticate = require("../middleware/authMiddleware")

const logrouter = express.Router();

logrouter.post('/logs', authenticate,logController.createLog);
logrouter.get('/logs', logController.getLogs);

module.exports = logrouter;
