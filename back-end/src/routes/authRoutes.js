const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// O 'app.js' traz o '/auth' e essa linha complementa com o '/login'
router.post('/login', authController.login);

module.exports = router;