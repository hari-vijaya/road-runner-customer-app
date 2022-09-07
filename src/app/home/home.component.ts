import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { distance } from '../utils/AppUtils';
import { Router } from '@angular/router';
import LatLng = google.maps.LatLng;
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;

  formattedAddress: string = '';
  origin = { lat: 24.799448, lng: 120.979021 };
  destination = { lat: 24.799524, lng: 120.975017 };

  isValidDistance: boolean = false;
  mapLoaded: boolean = false;

  isDestinationAvailable = false;

  markerOptions = {
    origin: {
      draggable: true,
    },
    destination: {
      draggable: true,
    },
  };

  renderOptions = {
    suppressMarkers: true,
  };

  currentAddress: string;
  private geoCoder: google.maps.Geocoder;

  @ViewChild('originInputRef')
  private originInputElementRef: GooglePlaceDirective;

  @ViewChild('destinationInputRef')
  private destinationInputElementRef: GooglePlaceDirective;

  constructor(private router: Router, private mapsAPILoader: MapsAPILoader) {}

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

    });
    setTimeout(() => {
      this.mapLoaded = true;


      let originElementAutocomplete = document.getElementById('originInputRef');
      if (originElementAutocomplete !== null)
        originElementAutocomplete.setAttribute('value', this.currentAddress);
      console.log(this.currentAddress);
    }, 5000);
  }

  public handleOriginAddressChange(address: Address) {
    this.originLat = address.geometry.location.lat();
    this.originLng = address.geometry.location.lng();
    this.checkValidDistance();
  }

  checkValidDistance() {
    const distanceBetweenOriginAndDestination = distance(
      this.originLat,
      this.originLng,
      this.destinationLat,
      this.destinationLng,
      'K'
    );
    if (distanceBetweenOriginAndDestination > 10) {
      this.isValidDistance = true;
    } else {
      this.isValidDistance = false;
    }
    console.log(
      'distance ' +
        distance(
          this.originLat,
          this.originLng,
          this.destinationLat,
          this.destinationLng,
          'K'
        )
    );
  }

  public handleDestinationAddressChange(address: Address) {
    console.log(address);
    this.destinationLat = address.geometry.location.lat();
    this.destinationLng = address.geometry.location.lng();
    this.isDestinationAvailable = true;
    this.checkValidDistance();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.originLat = position.coords.latitude;
        this.originLng = position.coords.longitude;

        this.getAddress(position.coords.latitude, position.coords.longitude);

        /*     this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
             console.log(this.formattedAddress);
             let originElementAutocomplete = document.getElementById('originInputRef');
             let destinationElementAutocomplete = document.getElementById('destinationInputRef');
             if (originElementAutocomplete !== null)
               originElementAutocomplete.setAttribute('value', this.formattedAddress);
             if (destinationElementAutocomplete !== null)
               destinationElementAutocomplete.setAttribute('value', this.formattedAddress);*/
      });
    }
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: { formatted_address: any }[], status: string) => {
        if (status === 'OK') {
          if (results[0]) {
            this.currentAddress = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  navigateToCreateOrderPage() {
    sessionStorage.setItem('originLat', String(this.originLat));
    sessionStorage.setItem('originLng', String(this.originLng));
    sessionStorage.setItem('destinationLat', String(this.destinationLat));
    sessionStorage.setItem('destinationLng', String(this.destinationLng));
    this.router.navigateByUrl('add-order');
  }
}
