import React, { Component } from 'react';
import './App.css';
import MainWindow from './MainWindow'
import gambler from './img/gambler.png'
import gamblerheart from './img/gamblerheart.png'

class App extends Component {
  state = {
    places: [],
    activeMarker: {}
  }

  setActiveMarker = (marker) => {
    this.state.places.map((place) => place.setIcon(gambler));
    
    this.setState({
      activeMarker: marker
    })
  }

  setActiveMarkerFromLatLng = (latLng) => {
    this.state.places.map((place) => place.setIcon(gambler));
    let activeMarker = (this.state.places.filter((place) => place.position.lat === latLng.lat))[0];
    activeMarker.setIcon(gamblerheart);
    this.setState({
      activeMarker: activeMarker
    })
  }

  setActiveMarkerFromName = (markerName) => {
    this.state.places.map((place) => place.setIcon(gambler));
    let activeMarker = (this.state.places.filter((place) => place.title === markerName))[0];
    activeMarker.setIcon(gamblerheart);
    let modifiedPlaces = this.state.places.filter((place) => place.title !== markerName).concat(activeMarker);
    this.setState({
      places: modifiedPlaces,
      activeMarker: activeMarker
    })
  }

  createMarkersForPlaces = function(google, map, places) {
    let tempPlaceMarkers = [];
    for (let i = 0; i < places.length; i++)
    {
        var place = places[i];
        var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
            icon: gambler
        });
        
        marker.addListener('click', (e) => this.setActiveMarkerFromLatLng(e.latLng))

        tempPlaceMarkers.push(marker);
    }
    
    this.setState({
      places: tempPlaceMarkers
    });
  }

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
  
  render() {
    return (
      <MainWindow 
        places={this.state.places}
        fetchPlaces={this.fetchPlaces}
        createMarkersForPlaces={this.createMarkersForPlaces}
        setActiveMarker={this.setActiveMarker}
        activeMarker={this.state.activeMarker}
        setActiveMarkerFromName={this.setActiveMarkerFromName}/>
    );
  }
}

export default App;
