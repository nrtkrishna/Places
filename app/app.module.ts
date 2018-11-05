import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  //   AgmCoreModule.forRoot({
  //     apiKey:'AIzaSyDN5GMLUnnLlStwhxukwqa0LKsg32XQ004',
  //      libraries: ["places"]
  //  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
