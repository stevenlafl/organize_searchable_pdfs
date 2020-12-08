const express = require('express');
const router = express.Router();
const todoRoutes = require('./todos');
const documentRoutes = require('./documents');
const filesRoutes = require('./files');

router.get('/message', (req, res) => {
	res.send({message: "Hello from Express Mongo backend."});
});

router.use('/todos', todoRoutes)
router.use('/documents', documentRoutes)
router.use('/files', filesRoutes)

module.exports = router;
