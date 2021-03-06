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
isBookThisDate: boolean = false;
isButtonChangeSearch:boolean = false;

filterUniqueOrigin = [];
filterUniqueDestination = [];
unique: any;

origin: string ='';
destination: string = '';
date: string='';

listFlights: any;
listBooks: any;
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
  nameBook: '',
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
     this.disableDates();
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
      this.isButtonChangeSearch = true;

    }

    resetSelectDestination(){
       this.filterUniqueDestination = []; 
    }

    //postBook
    addBook(){
       let dateNow = new Date();  
       //check if have book now
      this.book= {
          _id: '',
          idBook: this.book.idBook,
          nameBook: this.book.nameBook,
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

    getBookById(idBook: string){
      this.flightService.getBook(this.book.idBook)
      .subscribe(res=>{
        this.listBooks = res;
        console.log(this.listBooks);

         let dateNow = new Date();
         let formatDateNow = moment(dateNow).format('L');
          console.log("fehca actual: "+formatDateNow);

         for(let i=0; i<this.listBooks.length; i++){
            let formatDateBook = moment(this.listBooks[i].dateBook).format('L');
            console.log(formatDateBook);
            if(formatDateBook.toString() == formatDateNow.toString()){
              console.log("las dos fechas coinciden");
              this.isBookThisDate = true;
              console.log(this.isBookThisDate);
            }
          }

           if(this.isBookThisDate == false){
                this.addBook();
            }else{
              M.toast({html: 'you already have an booking registered'});
              this.book.idBook ='';
              this.book.nameBook ='';
              this.isBookThisDate = false;
            }
      });  
    }

    disableDates(){
     //disable dates before today
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);
    }

    changeSearch(){
      this.isFormSearch = true;
      this.isAdvancedSearch = false;
      this.showFormBook = false;
      this.isButtonChangeSearch = false;
    }
   
}
