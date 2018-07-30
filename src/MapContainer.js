import React, { Component } from 'react'
import { InfoWindow, Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    onMapClick = () => {
        this.props.setActiveMarker(null);
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
                        lng: -115.1660729
                      }}
                    zoom={12}
                    onReady={(mapProps, map) => {
                        this.props.fetchPlaces(mapProps, map) }}
                    onClick={this.onMapClick}
                    >
                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.activeMarker !== null}>
                            <div>
                                <p>{this.props.activeMarker !== null && this.props.activeMarker.title}</p>
                            </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCtI5cDwlK_tRVt6_p8GzCStxyq8S_FykA'
})(MapContainer)