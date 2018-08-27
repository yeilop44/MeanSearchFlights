const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
	idBook: { type: String, required: true},
	dateBook: { type: String, required: true},
	destinationBook: {type: String, required: true},
	originBook: {type: String, required: true},
	dateFlight: {type: String, required: true},
	hourFlight: {type: String, requerid: true},
	costFlight: {type: Number, requerid: true}
})


module.exports = mongoose.model('Book', BookSchema);