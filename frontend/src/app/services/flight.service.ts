import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/flight';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

	selectedFlight: Flight;
	flights: Flight[];

  
  readonly URL_API = 'http://localhost:3000/api/flights';
  readonly URL_API2 = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) { 
  	this.selectedFlight = new Flight();
  }

  getFlights() {
  	return this.http.get(this.URL_API);
  }

  getFlight(_id: string) {
    return this.http.get(this.URL_API+ `/${_id}`);
  }


  //search fligths by ORIGIN
  getFlightByOrigin(origin: string) {
    return this.http.get(this.URL_API+ '/origin'+`/${origin}`);
  }


  //search fligths by ORIGIN, DESTINAION and DATE
  getFlightMultiParams(origin: string, destination: string, date: string) {
    return this.http.get(this.URL_API+ '/origin'+`/${origin}`+'/destination'+`/${destination}`+'/date'+`/${date}`);
  }
  
  postFlights(Flight: Flight) {
  	return this.http.post(this.URL_API, Flight);
  }
  
  putFlight(Flight: Flight) {
  	return this.http.put(this.URL_API + `/${Flight._id}`, Flight);
  }
  deleteFlights(_id: string) {
  	return this.http.delete(this.URL_API + `/${_id}`);
  }


  postBook(book: Book) {


    let x: Book = {
       _id: book._id,
      idBook: book.idBook,     
      dateBook: book.dateBook,
      originBook: book.originBook,
      destinationBook: book.destinationBook,
      dateFlight: book.dateFlight,
      hourFlight: book.hourFlight,
      costFlight: book.costFlight
      };
    return this.http.post(this.URL_API2, x);
  }



  getBook(idBook: string) {
    return this.http.get(this.URL_API2+ `/${idBook}`);
  }

}
