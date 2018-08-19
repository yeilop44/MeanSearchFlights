const mongoose = require('mongoose');
const { Schema } = mongoose;

const FlightSchema = new Schema({
	origin: { type: String, required: true},
	destination: {type: String, required: true},
	date: {type: String, required: true},
	hour: {type: String, requerid: true},
	cost: {type: Number, requerid: true}
})


module.exports = mongoose.model('Flight', FlightSchema);