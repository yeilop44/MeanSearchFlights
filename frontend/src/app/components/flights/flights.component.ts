import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { NgForm } from '@angular/forms';
import { Flight } from '../../models/flight';


declare var M: any;

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  providers: [FlightService]
})
export class FlightsComponent implements OnInit {


  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.disableDates();
    this.getFlights();
  }

  
  addFlight(form: NgForm){
    if(form.value._id){
      this.flightService.putFlight(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Flight Updated'});
          this.getFlights();
        })

    }else{
       this.flightService.postFlights(form.value)
        .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Flight Saved'});
        this.getFlights();
      });
    }
  }

  getFlights(){
    this.flightService.getFlights()
      .subscribe(res => {
        this.flightService.flights = res as Flight[];
      });
  }

  editFlight(flight: Flight){
    this.flightService.selectedFlight = flight;
  }

   deleteFlight(_id: string){
    if(confirm('Are you sure to delete this flight?')){
      this.flightService.deleteFlights(_id)
        .subscribe(res =>{
        M.toast({html: 'Flight Deleted'});
        this.getFlights();
      });
    }
  }

  //clean the form
  resetForm(form?: NgForm){
  	if(form){
  		form.reset();
  		this.flightService.selectedFlight = new Flight();

  	}
  }

  disableDates(){
     //disable dates before today
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);
    }

}
