import React, { Component } from 'react'
import ElementsList from './ElementsList'
import MapContainer from './MapContainer'

class MainWindow extends Component {
    render() {
        return (
            <main>
                <header>
                    <h1 className='header'>Neighborhood Map</h1>
                </header>
                <ElementsList 
                    places={this.props.places}/>
                <div id='map'>
                    <MapContainer 
                        places={this.props.places}
                        fetchPlaces={this.props.fetchPlaces}
                        createMarkersForPlaces={this.props.createMarkersForPlaces}
                        setActiveMarker={this.props.setActiveMarker}
                        activeMarker={this.props.activeMarker}/>
                </div>
                <footer>
                    <p className='footer'>Made with <b className='far fa-heart'></b> by Mateusz Margos</p>
                </footer>
            </main>
        )
    }
}

export default MainWindow