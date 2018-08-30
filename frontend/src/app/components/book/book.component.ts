import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

idBook = "";	
books : any;
isShowBook = false;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
  	
  }


getBookById(idBook: string){
	this.isShowBook = false;
	this.flightService.getBook(this.idBook)
	 .subscribe(res=>{
	 	this.books = res;
	});

	this.isShowBook = true;
	this.idBook ="";
}



}
