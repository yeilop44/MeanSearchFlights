const Flight = require('../models/flights');

const flightCtrl = {};

//getAll
flightCtrl.getFlights = async(req, res) => {
	const flights = await Flight.find();
	res.json(flights);
} 

//getOne
flightCtrl.getFlight = async(req, res) => {
	const flights = await Flight.findById(req.params.id);
	res.json(flights);
} 

//post
flightCtrl.createFlights = async (req, res) => {
	const flight = new Flight(req.body);
	await flight.save()
	res.json({
		'status': 'Flight saved'
	});
} 

//put
flightCtrl.editFlight = async (req, res) =>{
	const { id } = req.params;
	const flight = {
		name: req.body.name,
		position: req.body.position,
		office: req.body.office,
		salary: req.body.salary
	}

	await Flight.findByIdAndUpdate(id, {$set: flight}, {new: true});
	res.json({satatus: 'Flight updated'});
} 

//delete
flightCtrl.deleteFlight = async (req, res) =>{
	await Flight.findByIdAndRemove(req.params.id);
	res.json({status: 'Flight deleted'});
}

module.exports = flightCtrl;