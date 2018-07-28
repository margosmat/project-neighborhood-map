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
    this.setState({
      activeMarker: marker
    })
  }

  changeActiveMarkerIcon = (markerName) => {
    this.state.places.map((place) => place.icon = gambler);
    let activeMarker = (this.state.places.filter((place) => place.name === markerName))[0];
    activeMarker.icon = gamblerheart;
    let modifiedPlaces = this.state.places.filter((place) => place.name !== markerName).concat(activeMarker);
    this.setState({
      places: modifiedPlaces
    })
    
  }

  fetchPlaces = (mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    const self = this;
    service.textSearch({
        type: 'casino',
        location: map.center
    }, function(results, status) {
        let modifiedResults = results.map((result) => result.icon = gambler);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          self.setState({
            places: results
          })
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
        changeActiveMarkerIcon={this.changeActiveMarkerIcon}/>
    );
  }
}

export default App;
