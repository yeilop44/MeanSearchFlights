const mongoose = require('mongoose');
const { Schema } = mongoose;

const FlightSchema = new Schema({
	name: { type: String, required: true},
	position: {type: String, required: true},
	office: {type: String, required: true},
	salary: {type: Number, requerid: true}
})


module.exports = mongoose.model('Flight', FlightSchema);