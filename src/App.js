import React, { Component } from 'react';
import './App.css';
import MainWindow from './MainWindow'

class App extends Component {
  state = {
    places: []
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
              id: place.id
          });
          
          tempPlaceMarkers.push(marker);
      }
      
      () => this.setState({
        places: tempPlaceMarkers
      });
  }

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    const self = this;
    service.textSearch({
        type: 'casino',
        location: map.center
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          self.createMarkersForPlaces(google, map, results)
        }
    })
  }
  
  render() {
    return (
      <MainWindow 
        places={this.state.places}
        fetchPlaces={this.fetchPlaces}
        createMarkersForPlaces={this.createMarkersForPlaces}/>
    );
  }
}

export default App;
