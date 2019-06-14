import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

declare var google;

@Injectable({
  providedIn: 'root'
})

export class GoogleService {

  markers: Array<any> = [];

  constructor(
    public http: HttpClient
  ) { }

  createMap(currentLocation, mapElement) {
    const mapOptions = {
      center: currentLocation,
      zoom: 15
    };
    const map = new google.maps.Map(
      mapElement.nativeElement,
      mapOptions
    );
    return map;
  }

  getRestaurants(map, location, radius, name): Promise<Array<any>> {
    // See: https://developers.google.com/maps/documentation/javascript/places#place_search_requests
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location,
        radius,
        types: ['restaurant'],
        name
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if ( status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          console.log(status);
          reject(status);
        }
      });
    });
  }

  addMarker(map, position, title, content, iconUrl) {
    const icon = {
      url: iconUrl,
      anchor: new google.maps.Point(25, 25),
      scaledSize: new google.maps.Size(15, 15)
    };
    const marker = new google.maps.Marker({
      position,
      map,
      title,
      icon
    });
    const infoWindow = new google.maps.InfoWindow({
      content,
      maxWidth: 400
    });
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    this.markers.push(marker);
    return marker;
  }

  clearMarkers() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
  }

}
