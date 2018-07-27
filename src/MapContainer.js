import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
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
                        lat: 36.1014692,
                        lng: -115.1460729
                      }}
                    zoom={11}

                    >
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCtI5cDwlK_tRVt6_p8GzCStxyq8S_FykA'
})(MapContainer)