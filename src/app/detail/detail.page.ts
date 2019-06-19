import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleService } from '../services/api/google.service';
import { WatsonService } from '../services/api/watson.service';

declare var google;

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss']
})

export class DetailPage implements OnInit {
  // TODO replace place by replaceDetails
  placeId: any;
  place: any;
  currentLocation: any;
  @ViewChild('placeElement') mapElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleService: GoogleService,
    private watsonService: WatsonService
  ) {

  }

  ngOnInit() {
    this.route.queryParams.pipe( (params) => params)
    .subscribe(params => {
      this.placeId = params.id;
      const location = JSON.parse(params.location);
      this.currentLocation = location;
      this.getPlaceDetails();
    });
  }

  getPlaceDetails() {
    const placeId = this.placeId;
    const request = {
      placeId,
      types: ['restaurant'],
      fields: [
        'name', 'rating', 'formatted_phone_number', 'geometry',
        'reviews', 'opening_hours', 'vicinity', 'types',
        'price_level', 'user_ratings_total', 'website'
      ]
    };
    const mapLocation = new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng);
    const map = this.googleService.createMap(this.currentLocation, this.mapElement);
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (details, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(`=====>details`);
        console.log(details);
        this.place = details;
        //this.getSentimentForReviews();
      } else {
        console.log(`=====>details.status not OK: ${status}`);
      }
    });
  }

  getSentimentForReviews() {
    for ( const review of this.place.reviews) {
      this.watsonService.getTone(review.text)
      .then( (tone) => {
        // TODO add tone to review
        
      })
      .catch( (error) => {
        console.log(error);
      });
    }
  }

}
