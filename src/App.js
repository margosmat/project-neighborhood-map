import React, { Component } from 'react';
import './App.css';
import MainWindow from './MainWindow'
import gambler from './img/gambler.png'
import gamblerheart from './img/gamblerheart.png'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import $ from 'jquery'

class App extends Component {
  state = {
    places: [],
    activeMarker: {},
    query: '',
    infoWindow: null,
    map: {},
    google: {}
  }

  // Function that hides elements list and sets active marker to null on map click
  onMapClick = () => {
    this.state.places.map((place) => place.setIcon(gambler));
    if (this.state.infoWindow !== null) this.state.infoWindow.close();

    $('.elements-list-container').removeClass('elements-list-opened');
    $('.nav-button').removeClass('elements-list-opened');

    this.setState({
      activeMarker: null
    });
  }

  // Function that sets active marker from LatLng object
  setActiveMarkerFromLatLng = (latLng) => {
    this.state.places.map((place) => place.setIcon(gambler));
    let activeMarker = (this.state.places.filter((place) => place.position.lat === latLng.lat))[0];
    activeMarker.setIcon(gamblerheart);
    this.setState({
      activeMarker: activeMarker
    }, this.openInfoWindow)
  }

  // Function that sets active marker from casino name
  setActiveMarkerFromName = (markerName) => {
    this.state.places.map((place) => place.setIcon(gambler));
    let activeMarker = (this.state.places.filter((place) => place.name === markerName))[0];
    activeMarker.setIcon(gamblerheart);
    let modifiedPlaces = this.state.places.filter((place) => place.name !== markerName).concat(activeMarker);
    this.setState({
      places: modifiedPlaces,
      activeMarker: activeMarker
    }, this.openInfoWindow)
  }

  // Function that creates array of markers from fetched places
  createMarkersForPlaces = function(google, map, places) {
    let tempPlaceMarkers = [];
    for (let i = 0; i < places.length; i++)
    {
        var place = places[i];
        var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            name: place.name,
            position: place.geometry.location,
            icon: gambler
        });

        marker.addListener('click', (e) => this.setActiveMarkerFromLatLng(e.latLng));

        tempPlaceMarkers.push(marker);
    }
    
    this.setState({
      places: tempPlaceMarkers,
      google: google,
      map: map
    });
  }

  // Function that fetch specified places on current map
  fetchPlaces = (mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    const self = this;
    service.textSearch({
        type: 'casino',
        location: map.center
    }, function(results, status) {
        results.map((result) => result.icon = gambler);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          self.createMarkersForPlaces(google, map, results);
        }
    })
  }

  // Function that updates query from filter input
  updateQuery = (query) => {
    this.setState({
      query: query
    }, this.updateMarkers)
  }

  // Function that filters visible markers based on the filter query
  updateMarkers = () => {
    let filteredPlaces, filteredOutPlaces, allPlaces;
    if (this.state.query) {
      const match = RegExp(escapeRegExp(this.state.query), 'i');
      filteredPlaces = this.state.places.filter((place) => match.test(place.title));
      filteredPlaces.map((place) => place.setMap(this.state.map));
      filteredOutPlaces = this.state.places.filter((place) => !match.test(place.title));
      filteredOutPlaces.map((place) => place.setMap(null));
      allPlaces = filteredPlaces.concat(filteredOutPlaces);
    } 
    else {
      allPlaces = this.state.places;
      allPlaces.map((place) => place.setMap(this.state.map));
    }

    allPlaces.sort(sortBy('name'));

    this.setState({
      places: allPlaces
    })
  }

  // Function that creates instance of InfoWindow
  createInfoWindow = () => {
    let infoWindow = new this.state.google.maps.InfoWindow();
    infoWindow.setOptions({maxWidth: 250});

    this.setState({
      infoWindow: infoWindow
    }, () => {
      this.openInfoWindow();
    })
  }

  // Function that gets information about active place and opens InfoWindow for it
  openInfoWindow = () => {
    if (this.state.infoWindow === null) {
      this.createInfoWindow();
      return;
    }

    this.state.infoWindow.close();
    this.getActivePlaceAdditionalInformation();
  }

  // Function that fetch information about active place
  getActivePlaceAdditionalInformation = () => {
    let casinoId;
    let venueTip = "Couldn't get additional information regarding this venue.";
    let venueLink = '';
    let self = this;

    fetch(`https://api.foursquare.com/v2/venues/search?ll=${this.state.activeMarker.position.lat()},${this.state.activeMarker.position.lng()}&intent=match&name=${this.state.activeMarker.name}&client_id=${process.env.REACT_APP_SECRET2}&client_secret=${process.env.REACT_APP_SECRET3}&v=20180731`)
      .then(response => response.json())
      .then(function(response) {
        if (response.meta.code === 200 && response.response.venues.length > 0) {
          casinoId = response.response.venues[0].id;
          venueLink = 'http://foursquare.com/v/' + casinoId;
          return fetch(`https://api.foursquare.com/v2/venues/${casinoId}/tips?sort=popular&client_id=${process.env.REACT_APP_SECRET2}&client_secret=${process.env.REACT_APP_SECRET3}&v=20180731`);
        } else {
          self.fillActivePlaceInfoWindow(self.state.activeMarker.name, venueTip, venueLink);
        }
      })
      .then(tips => tips.json())
      .then(function(tips) {
        if (tips.meta.code === 200 && tips.response.tips.count > 0) {
          venueTip = '<b>Most popular review:</b> ' + tips.response.tips.items[0].text;
        }
        self.fillActivePlaceInfoWindow(self.state.activeMarker.name, venueTip, venueLink);
      })
      .catch(function(response) {
        alert('failed' + response);
      });
  }

  // Function that fills active place InfoWindow with details
  fillActivePlaceInfoWindow = (name, popularReview, venueLink) => {
    const details = document.createElement('div');
    details.className = 'info-window';

    const placeName = document.createElement('h4');
    placeName.innerHTML = name;
    details.append(placeName);

    const additionalInfo = document.createElement('p');
    additionalInfo.innerHTML = popularReview;
    details.append(additionalInfo);

    if (venueLink !== '') {
      const venueLinkElement = document.createElement('a');
      venueLinkElement.innerHTML = "Venue page on Foursquare";
      venueLinkElement.href = venueLink;
      venueLinkElement.setAttribute('aria-label', `View details of the ${name}`);
      venueLinkElement.target = '_blank';
      details.append(venueLinkElement);
    }

    this.state.infoWindow.setContent(details);
    this.state.infoWindow.open(this.state.map, this.state.activeMarker);
  }
  
  render() {
    let filteredPlaces;
    if (this.state.query) {
      const match = RegExp(escapeRegExp(this.state.query), 'i');
      filteredPlaces = this.state.places.filter((place) => match.test(place.title));
    } 
    else {
      filteredPlaces = this.state.places;
    }

    filteredPlaces.sort(sortBy('name'));
    
    return (
      <MainWindow 
        places={filteredPlaces}
        fetchPlaces={this.fetchPlaces}
        onMapClick={this.onMapClick}
        setActiveMarkerFromName={this.setActiveMarkerFromName}
        query={this.state.query}
        updateQuery={this.updateQuery}/>
    );
  }
}

export default App;
