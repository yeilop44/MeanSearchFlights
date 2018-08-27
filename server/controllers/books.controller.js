const Book = require('../models/books');

const bookCtrl = {};


//getAll
bookCtrl.getBooks = async(req, res) => {
	const books = await Book.find();
	res.json(books);
} 


//post
bookCtrl.createBooks = async (req, res) => {
	const book = new Book({
		idBook: req.body.idBook,
		dateBook: req.body.dateBook,
		originBook: req.body.originBook,
		destinationBook: req.body.destinationBook,
		dateFlight: req.body.dateFlight,
		hourFlight: req.body.hourFlight,
		costFlight: req.body.costFlight
	});
	await book.save()
	res.json({
		'status': 'Book saved'
	});
} 

module.exports = bookCtrl;