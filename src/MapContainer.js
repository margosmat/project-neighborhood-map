import React, { Component } from 'react'
import { InfoWindow, Marker, Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    onMarkerClick = (props, marker, e) => {
        this.props.setActiveMarker(marker);
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
                    >
                    {this.props.places.length && this.props.places.map((marker) => (
                        <Marker
                            name={marker.name}
                            position={marker.geometry.location}
                            onClick={this.onMarkerClick}
                            icon={marker.icon}
                        />
                    ))}
                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.activeMarker !== null}>
                            <div>
                                <p>{this.props.activeMarker.name}</p>
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