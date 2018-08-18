import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  providers: [FlightService]
})
export class FlightsComponent implements OnInit {


  constructor(private flightService: FlightService) { }

  ngOnInit() {
  }

  addFlight(form: NgForm){
  	this.flightService.postFlights(form.value)
  		.subscribe(res => {
  			console.log(res);
  		})
  }



  resetForm(form?: NgForm){
  	if(form){
  		form.reset();
  		//this.flightService.selectedFlight = new Flight();

  	}
  }

}
