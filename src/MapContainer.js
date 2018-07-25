import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapContainer extends Component {
    static defaultProps = {
        center: {
          lat: 36.1014692,
          lng: -115.1460729
        },
        zoom: 11
      };

    render() {
        return (
            <div id='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCtI5cDwlK_tRVt6_p8GzCStxyq8S_FykA' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text={'Kreyser Avrora'}
                    />
                </GoogleMapReact>
            </div>
        )
    }
}

export default MapContainer