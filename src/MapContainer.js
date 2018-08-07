import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    onMapClick = () => {
        this.props.onMapClick();
    }
    
    render() {
        const style = {
            width: '100%',
            height: 'calc(100vh - 88px)'
        }
        return (
            <div role='application'>
                <Map
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 36.1314692,
                        lng: -115.1660729
                      }}
                    zoom={12}
                    onReady={(mapProps, map) => {
                        this.props.fetchPlaces(mapProps, map); }}
                    onClick={this.onMapClick}
                    >
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAvwHBT6f5xufxYH1tbf62JfXqGeeZGgSE'
})(MapContainer)