const mongoose = require('mongoose'); 

const URI = 'mongodb://localhost/MeanSearchFlights';
 
mongoose.connect(URI)
	.then(db => console.log('db is connected now'))
	.catch(err => console.error(err));

module.exports = mongoose; 