const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/books.controller');

router.get('/', bookCtrl.getBooks);
router.post('/', bookCtrl.createBooks);



module.exports = router;