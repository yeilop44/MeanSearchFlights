const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/books.controller');

router.get('/', bookCtrl.getBooks);
router.get('/:idBook', bookCtrl.getBooksByIdBook);
router.post('/', bookCtrl.createBooks);



module.exports = router;