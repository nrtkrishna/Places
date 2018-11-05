
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  autocomplete: google.maps.places.Autocomplete;
  lat:number;
  long:number;
  geocoder:any;

  @ViewChild("search") public searchEleRef : ElementRef;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {

    var google_map_url = '';
    var lang = navigator.language;
    if(lang === 'zh'){
         google_map_url = 'http://maps.google.cn/maps/api/js?region=KR'; 
    }else{
        google_map_url = 'https://maps.google.com/maps/api/js?region=KR';
    } 
   

    this.geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
      var navigatorOptions = {
        enableHighAccuracy: true
      };

     navigator.geolocation.getCurrentPosition((position)=>{
      console.log("User  Location ==> ",position);
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          let latlng = new google.maps.LatLng(this.lat, this.long);
          let request: any = { 'latLng': latlng };  
          
          this.geocoder.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0] != null) {
                let city = results[0].address_components[results[0]
                          .address_components.length-4].short_name;

                // let country = results[0].address_components[results[4].address_components.length-4].short_name;
                // results[0].address_components[results[4] will give country name.
                console.log("Geo Location ==> ", city);
              } else {
                alert("No address available");
              }
            }
            else{
              alert("Google Places API is not loaded")
            }
          });
      },error => {
        console.log("Navigator Error", error);
      },navigatorOptions);
    }
  }

  onSearch(){
    var options = {
      types: ["address"],
      //componentRestrictions: {country: 'ch'}
    };

    //this.autocomplete = new google.maps.places.Autocomplete(this.searchEleRef.nativeElement,{types: ["address"]});
    this.autocomplete = new google.maps.places.Autocomplete(this.searchEleRef.nativeElement,options);
    this.autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        console.log("Place ===> ", place);
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        
       console.log(place.geometry.location.lat());
       console.log(place.geometry.location.lng());
      
      });
    });
 

    console.log("Initializing autocomplete..", this.autocomplete);


  }

}

