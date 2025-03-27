const express = require('express');
const { generateToken } = require('../controller/tokenController');
const authenticate = require("../middleware/authMiddleware")


const tokenRoutes = express.Router();

tokenRoutes.post('/generate',authenticate,generateToken);

module.exports = tokenRoutes;