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
                    places={this.props.places}
                    setActiveMarkerFromName={this.props.setActiveMarkerFromName}
                    query={this.props.query}
                    updateQuery={this.props.updateQuery}/>
                <div id='map'>
                    <MapContainer 
                        fetchPlaces={this.props.fetchPlaces}
                        onMapClick={this.props.onMapClick}/>
                </div>
                <footer>
                    <p className='footer'>Made with <b className='far fa-heart'></b> by Mateusz Margos</p>
                </footer>
            </main>
        )
    }
}

export default MainWindow