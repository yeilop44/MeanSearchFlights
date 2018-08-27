const Flight = require('../models/flights');

const flightCtrl = {};


//getAll
flightCtrl.getFlights = async(req, res) => {
	const flights = await Flight.find();
	res.json(flights);
} 

//getById
flightCtrl.getFlight = async(req, res) => {
	const flights = await Flight.findById(req.params.id);
	res.json(flights);
} 

//getByOrigin
flightCtrl.getFlightByOrigin = async(req, res) => {
	const flights = await Flight.find({origin:req.params.origin});
	res.json(flights);
} 


//getMultiParamas
flightCtrl.getFlightMulti = async(req, res) => {
	const flights = await Flight.find({origin:req.params.origin, destination:req.params.destination, date:req.params.date});
	res.json(flights);
} 

//post
flightCtrl.createFlights = async (req, res) => {
	const flight = new Flight({
		origin: req.body.origin,
		destination: req.body.destination,
		date: req.body.date,
		hour: req.body.hour,
		cost: req.body.cost
	});
	await flight.save()
	res.json({
		'status': 'Flight saved'
	});
} 

//put
flightCtrl.editFlight = async (req, res) =>{
	const { id } = req.params;
	const flight = {
		origin: req.body.origin,
		destination: req.body.destination,
		date: req.body.date,
		hour: req.body.hour,
		cost: req.body.cost
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