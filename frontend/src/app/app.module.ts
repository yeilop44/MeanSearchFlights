import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flights/flights.component';
import { SearchComponent } from './components/search/search.component';
import { BookComponent } from './components/book/book.component';

const appRoutes: Routes = [
  {
    path: 'flights',
    component:FlightsComponent
  },
  {
    path: 'search',
    component:SearchComponent
  },
  {
    path: 'books',
    component:BookComponent
  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    SearchComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
