import React, { Component } from 'react'
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    state = {
        placeMarkers: []
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

    createMarkersForPlaces(google, map, places) {
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

        this.setState({
            placeMarkers: tempPlaceMarkers
        });
    }
    
    render() {
        const style = {
            width: '100%',
            height: 'calc(100vh - 88px)'
        }
        
        return (
            <div>
                <Map
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 36.1314692,
                        lng: -115.1460729
                      }}
                    zoom={13}
                    onReady={(mapProps, map) => {
                        this.fetchPlaces(mapProps, map) }}
                    >
                    {this.state.placeMarkers.length && this.state.placeMarkers.map((marker) => (
                        <Marker
                            name={marker.title}
                            position={marker.position}
                        />
                    ))}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCtI5cDwlK_tRVt6_p8GzCStxyq8S_FykA'
})(MapContainer)