///<reference types="@types/googlemaps" />

import { Component, OnInit, Input } from '@angular/core';
//import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
 

    constructor(private ngZone: NgZone) {}
    
}