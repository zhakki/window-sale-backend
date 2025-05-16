const express = require('express');
const router = express.Router();
const teenusedController = require('../controllers/teenused.controller');
const { verifyToken, authorizeRoll } = require('../middleware/authJwt');

// Получить список услуг
router.get('/', teenusedController.getAll);

// Добавить новую услугу (только менеджеры)
router.post('/', verifyToken, authorizeRoll(['Manager', 'SalesManager']), teenusedController.create);





module.exports = router;
