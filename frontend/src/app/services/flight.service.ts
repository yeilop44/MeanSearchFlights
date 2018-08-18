import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/flight';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

	selectedFlight: Flight;
	flights: Flight[];
	readonly URL_API = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) { 
  	this.selectedFlight = new Flight();
  }

  getFlights() {
  	return this.http.get(this.URL_API);
  }
  
  postFlights(Flight: Flight) {
  	return this.http.post(this.URL_API, Flight);
  }
  
  putFlights(Flight: Flight) {
  	return this.http.put(this.URL_API + `/${Flight._id}`, Flight);
  }
  deleteFlights(_id: string) {
  	return this.http.delete(this.URL_API + `/${_id}`);
  }

}
