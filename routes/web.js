// Routes 
const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');
require('express-group-routes');

router.get('/', function(req, res) {
    res.json({message:'Log Systems'});
});
router.get('/login', TestController.login);

module.exports = router;