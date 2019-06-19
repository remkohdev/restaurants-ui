# restaurants-ui

Screens:
* Search (default): Map with keyword search and location filters
* Detail: restaurant detail page with reviews
* History: history of restaurants visited

## Installation

See https://ionicframework.com/docs/installation/cli

## Config

* Set the Google API apikey in index.html
* Set the Watson Tone apikey in 'src/app/services/api/watson.service.ts'

## Run

```
ionic serve
```

# TODOs
Bugs:
* Page is already finished loading, while async getPlaceDetails is not done yet, so when you load the detail page, the previous detail (on first load this is null) is still showing, so wait for results or detect changes (use Observable?)

Major:
* State
    * Storing Search or Details State as is done in a React-Redux application is an option, but given the constant filtering of data and the mobile nature of the user, this might be futile. I chose not to persist state.
* Move the map object and methods all to the Google service component, and subscribe to location change, so that only when location changes, the map reloads, now it is being created at every page load,
* Add Tone to each PlaceDetail,
* Add History and 'Add Rating' option, onClick save ratings to database, and for each Place search for rating,
* Move credentials to .creds file, add .creds to .gitignore
* Add Authentication and personalization,
* Use proper property binding

Minor:
* Create restaurant-detail, restaurant-list, restaurant-item components
* Make 'use my location' optional, now it is default 
* remove item border bottom shadow on search list
* Fix search icon size
* Add back button on detail page to return to search list
* Reuse the same component in infoWindow as in Detail page
* Alternatively use expand list item to view details (e.g. https://www.youtube.com/watch?v=0-goeHxBc8c)