# restaurants-ui

Screens:
* Search (default): Map with keyword search and location filters
* Detail: restaurant detail page with reviews
* History: history of restaurants visited

## Run

```
ionic serve
```

Note: Link to detail page, needs a refresh still. Click on the page to trigger refresh. 

## Notes

Search, Detail and History pages are not protected by a GuardService, but each page attempts to load with personalized data first if the user is logged in, otherwise generic data will be displayed. 

# Storing State
Storing State as is done in a React-Redux application is an option, but given the constant filtering of data and the mobile nature of the user, this might be futile. I chose not to persist state.

TODOs 1:
* use a sentiment analysis tool (for example Turi Create Sentiment Analysis, or any other sentiment analysis tool) to show the sentiment of restaurant-goers reviews to help the user
decide where to dine.
* Add History, history of the places they have visited and rated.
* user can add their own thumbs up or down
* Design and create a database that can handle all the requirements of this project and can
potentially be deployed as a service or in a container
* Add dockerfile, docker-compose
* Pass in only the placeId and use placeDetails instead of place

TODOs 2:
* add filters to search page: 
    * O 'use my location' and 
* hide login/logout when respectively isAuthenticated equals false/true
* add login cancel button
* remove item border bottom shadow on search list
* Fix search icon size
* Move all map functions to GoogleService
* Add place to detail pace without exposing Get parameters
* Save previous state/search list
* Add back button on detail page to return to search list
* Reuse the same component in infoWindow as in Detail page

Alternatively use expand list item to view details (e.g. https://www.youtube.com/watch?v=0-goeHxBc8c)