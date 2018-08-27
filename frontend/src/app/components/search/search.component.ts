import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import { Book } from '../../models/book';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

isFormSearch: boolean = true;
isSearchOrigin: boolean = false;
isAdvancedSearch: boolean = false;

filterUniqueOrigin = [];
filterUniqueDestination = [];
unique: any;

origin: string ='';
destination: string = '';
date: string='';

listFlights: any;
listFlightsByOrigin: any;
listAdvancedSearch: any;


flight: Flight = {
  _id: '',
  origin: '',
  destination: '',
  date: '',
  hour: '',
  cost: 0

};



book: Book = {
  _id: '',
  idBook: '',
  dateBook: '',
  originBook: this.flight.origin,
  destinationBook: this.flight.destination,
  dateFlight:this.flight.date,
  hourFlight: this.flight.hour,
  costFlight: this.flight.cost

};

showFormBook:boolean = false;


  constructor(private flightService: FlightService) { }

  ngOnInit() {
    //this.disableDates();
  }
  
  //search all fligths
  getFlights(){
    if(this.isSearchOrigin == false){
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
        this.origin = "";     
        this.isSearchOrigin = true;
    }
  }

//search fligths by ORIGIN
  getFlightByOrigin(origin: string){
    
    if(this.origin != null){
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
  }

  //search fligths by ORIGIN, DESTINAION and DATE
  getFlightMultiParams(origin: string, destination: string, date: string){
    if(this.origin=='' || this.destination =='' || this.date==''){
       alert("any of the search fields is empty");
     }else{

      this.flightService.getFlightMultiParams(this.origin, this.destination, this.date)
        .subscribe(res => {
          this.listAdvancedSearch = res;
          console.log(this.listAdvancedSearch);

          if(this.listAdvancedSearch!=(null||0)){
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
            this.isAdvancedSearch = true;

          }else{
            alert("there aren't flights with these search parameters");
          }   
        });
          this.clearSearch();
          this.resetSelectDestination(); 
      }

  }

    disableDates(){
     //disable dates before today
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);
    }

    clearSearch(){
      this.origin = "";
      this.destination = "";
      this.date = "";
    }

    showDataToBook(flight: Flight){
      
      console.log(flight.hour);

      this.flight ={
        _id: flight._id,
        origin: flight.origin,
        destination: flight.destination,
        date: flight.date,
        hour: flight.hour,
        cost: flight.cost
      }
      this.showFormBook = true;
      this.isFormSearch = false;

    }

    resetSelectDestination(){
       this.filterUniqueDestination = []; 
    }


    addBook(){
        let dateNow = new Date();
       
      this.book= {
      _id: '',
      idBook: this.book.idBook,
      dateBook: dateNow.toString(),
      originBook: this.flight.origin,
      destinationBook: this.flight.destination,
      dateFlight:this.flight.date,
      hourFlight: this.flight.hour,
      costFlight: this.flight.cost
      };

       console.log(this.book);
       this.flightService.postBook(this.book)
       .subscribe(res=>{
       M.toast({html: 'Book Saved'});
       });
    }
   
}
