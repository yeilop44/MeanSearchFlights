import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import * as moment from 'moment';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

isAdvancedSearch: boolean = false;

filterUniqueOrigin = [];
filterUniqueDestination = [];
unique: any;

origin: string;
destination: string;
date: string;

listFlights: any;
listFlightsByOrigin: any;
listAdvancedSearch: any;


  constructor(private flightService: FlightService) { }

  ngOnInit() {
    //disable dates before today
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);
  }
  
  //search all fligths
  getFlights(){
    this.flightService.getFlights()
      .subscribe(res =>{
        this.listFlights = res;
        console.log(this.listFlights);
        // Keep an array of elements whose id is added in filtered array
        var elementId = [];
        this.filterUniqueOrigin = this.listFlights .filter(el => {
          if (elementId.indexOf(el.origin) === -1) {
            // If not present in array, then add it
            elementId.push(el.origin);
            return true;
          } else {
            // Already present in array, don't add it
            return false;
          }
          });
      });     
  }

//search fligths by ORIGIN
  getFlightByOrigin(origin: string){
      this.flightService.getFlightByOrigin(this.origin)
        .subscribe(res => {
          this.listFlightsByOrigin = res;
          console.log(this.listFlightsByOrigin);
          var elementId = [];
          this.filterUniqueDestination = this.listFlightsByOrigin.filter(el => {
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
            console.log(this.listAdvancedSearch);

            for(let i=0; i<this.listAdvancedSearch.length;i++){

              //check that the flight is on the weekend 
              var dayOfDate = moment(this.listAdvancedSearch[i].date).format('dddd');
              if(dayOfDate== 'Saturday' || dayOfDate== 'Sunday' ){
                 this.listAdvancedSearch[i].cost = this.listAdvancedSearch[i].cost + 60000;
                 console.log("your flight is more expensive because today is a weekend("+ dayOfDate +") NEW COST: " + this.listAdvancedSearch[i].cost);
              }

              //check that the flight is in the morning
              var midday = '12:00';
              var hourFlight = this.listAdvancedSearch[i].hour;
              if(hourFlight < midday){
                this.listAdvancedSearch[i].cost = this.listAdvancedSearch[i].cost + 30000;
                console.log("your flight is more expensive because it is in the morning ("+ hourFlight+") NEW COST: "+this.listAdvancedSearch[i].cost);  
              }
            }         
        });

        this.clearSearch();
        this.isAdvancedSearch = true; 
    }

    clearSearch(){
      this.origin = "";
      this.destination = "";
      this.date = "";
    }

}
