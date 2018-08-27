export class Flight {
	
	constructor(_id='', origin='', destination='', date='', hour='', cost=0){
		this._id = _id;
		this.origin = origin;        
		this.destination = destination;
		this.date = date;
		this.hour = hour;
		this.cost = cost;

	}


	_id: string;
	origin: string;
	destination: string;
	date: string;
	hour: string;
	cost: number;
}
