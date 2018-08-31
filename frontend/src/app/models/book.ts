
export class Book {

constructor(_id='', nameBook='', idBook='', dateBook='', originBook='', destinationBook='', dateFlight='',hourFlight='', costFlight=0){
		this._id = _id;
		this.idBook = idBook;
		this.dateBook = dateBook;
		this.originBook = originBook;        
		this.destinationBook = destinationBook;
		this.dateFlight = dateFlight;
		this.hourFlight = hourFlight;
		this.costFlight = costFlight;

	}


	_id: string;
	idBook: string;
	nameBook: string;
	dateBook: string;
	originBook: string;
	destinationBook: string;
	dateFlight: string;
	hourFlight: string;
	costFlight: number;
}
