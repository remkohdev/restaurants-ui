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
  placeDetails: any;
  place: any;
  @ViewChild('placeElement') mapElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleService: GoogleService,
    private watsonService: WatsonService
  ) {
    this.route.queryParams.subscribe( (params) => {
      if (params && params.place) {
        this.place = JSON.parse(params.place);
        console.log(`=====> placeDetail`);
        console.log(this.place);
      }
    });
  }

  ngOnInit() {
    this.getPlaceDetails();
  }

  getPlaceDetails() {
    const placeId = this.place.place_id;
    const request = {
      placeId,
      fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'reviews']
    };
    const map = this.googleService.createMap(this.place.geometry.location, this.mapElement);
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (details, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(`=====>details`);
        console.log(details);
        this.placeDetails = details;
        this.getSentimentForReviews();
      } else {
        console.log(`=====>details.status not OK: ${status}`);
      }
    });
  }

  getSentimentForReviews() {
    for ( const review of this.placeDetails.reviews) {
      console.log(`=====>review`);
      console.log(review);
      this.watsonService.getTone(review.text)
      .then( (tone) => {
        console.log(`=====>tone`);
        console.log(tone);
        // TODO add tone to review
      })
      .catch( (error) => {
        console.log(error);
      });
    }
  }

}
