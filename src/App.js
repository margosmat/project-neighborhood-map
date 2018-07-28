import React, { Component } from 'react';
import './App.css';
import MainWindow from './MainWindow'

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

  fetchPlaces = (mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    const self = this;
    service.textSearch({
        type: 'casino',
        location: map.center
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          self.setState((state) => ({
            places: state.places.concat(results)
          }))
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
        activeMarker={this.state.activeMarker}/>
    );
  }
}

export default App;
