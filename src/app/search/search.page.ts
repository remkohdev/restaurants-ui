import { Component, ViewChild, ElementRef, OnInit, AfterContentInit } from '@angular/core';
import { GoogleService } from '../services/api/google.service';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { google } from '@google/maps';

declare var google: any;


@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})

export class SearchPage implements OnInit {

  @ViewChild('mapElement') mapElement: ElementRef;
  map: any;
  places: Array<any> = [];
  markers: Array<any> = [];
  searchTerm = '';
  radius = 1000;
  currentLocation: google.maps.LatLng;

  constructor(
    private googleService: GoogleService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // use location
    this.geolocation.getCurrentPosition()
    .then((location) => {
      this.currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      this.map = this.googleService.createMap(this.currentLocation, this.mapElement);
      this.setCurrentLocationMarker();
      this.loadRestaurants();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data.coords.latitude
      // data.coords.longitude
      //console.log(data);
      console.log(`=====>reload restaurants with new center`);
    });
  }

  openDetail(place) {
    const extras: NavigationExtras = {
      queryParams: {
        place: JSON.stringify(place)
      }
    };
    this.router.navigate( ['tabs/detail'], extras );
  }

  searchByName() {
    console.log(`=====>searchByName`);
    if ( !this.searchTerm) {
      return false;
    }
    // TODO search restaurants by name
    this.loadRestaurants();
    return true;
  }

  loadRestaurants() {
    // load map of restaurants
    console.log(`=====> searchTerm`);
    console.log(this.searchTerm);
    this.googleService.getRestaurants(this.map, this.currentLocation, this.radius, this.searchTerm)
    .then( (restaurants ) => {
      this.clearMap();
      console.log(`=====>restaurants.length`);
      console.log(restaurants.length);
      for (const restaurant of restaurants) {
        // TODO subscribe to this.places?
        this.places.push(restaurant);

        // add restaurant markers to map
        const hours = restaurant.opening_hours.open_now ? 'Open' : 'Closed';
        const description = `<b>${restaurant.name}</b><br>${restaurant.vicinity}<br>${hours}<br>${restaurant.types.join(', ')}`;
        const marker = this.googleService.addMarker(
          this.map,
          restaurant.geometry.location,
          restaurant.name,
          description,
          restaurant.icon
        );
        this.markers.push(marker);
      }
    });
  }

  clearMap() {
    this.places = [];
    const markers = this.markers;
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.setCurrentLocationMarker();
  }

  setCurrentLocationMarker() {
    const marker = this.googleService.addMarker(
      this.map,
      this.currentLocation,
      null,
      null,
      null
    );
    this.markers.push(marker);
  }

}
