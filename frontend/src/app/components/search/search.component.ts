import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

newArr = [];
newArr1 = [];
unique: any;

origin: string;
destination: string;
date: string;
date1: string;

listFlights: any;

listAdvancedSearch: any;


  constructor(private flightService: FlightService) { }

  ngOnInit() {
  }

  getFlights(){
    this.flightService.getFlights()
      .subscribe(res =>{
        this.listFlights = res;
         
        // Keep an array of elements whose id is added in filtered array
        var elementId = [];

        this.newArr = this.listFlights .filter(el => {
                if (elementId.indexOf(el.origin) === -1) {
                  // If not present in array, then add it
                  elementId.push(el.origin);
                  return true;
                } else {
                  // Already present in array, don't add it
                  return false;
                }
                });

        var elementId = [];

        this.newArr1 = this.listFlights .filter(el => {
                if (elementId.indexOf(el.destination) === -1) {
                  // If not present in array, then add it
                  elementId.push(el.destination);
                  return true;
                } else {
                  // Already present in array, don't add it
                  return false;
                }
                });
      });     
  }



  //search fligths by ORIGIN, DESTINAION and DATE
  getFlightMultiParams(origin: string, destination: string, date: string){
     
      this.flightService.getFlightMultiParams(this.origin, this.destination, this.date)
        .subscribe(res => {
          this.listAdvancedSearch = res;
          console.log(this.origin);
          console.log(this.destination);
          console.log(this.date);
          
         console.log(this.listAdvancedSearch);
        });

    }
 















}
