import React, { Component } from 'react'
import $ from 'jquery'
import sortBy from 'sort-by'

class ElementsList extends Component {
    render() {
        return (
            <div className='elements-list-container'>
                <button 
                    className='nav-button'
                    onClick={() => {
                        $('.elements-list-container').toggleClass('elements-list-opened');
                        $('.nav-button').toggleClass('elements-list-opened');
                    }}>
                    <i className='fas fa-bars'></i>
                </button>
                <div className='elements-list'>
                <input
                    className='filter-input'
                    type='text'
                    placeholder='Filter places'
                    value={this.props.query}
                    onChange={(event) => this.props.updateQuery(event.target.value)}
                />
                <ul className='places-list'>
                    {this.props.places.length && this.props.places.sort(sortBy('name')).map((place) => (
                        <li key={place.name}>
                            <button onClick={() => {
                                $('.elements-list-container').toggleClass('elements-list-opened');
                                $('.nav-button').toggleClass('elements-list-opened');

                                this.props.setActiveMarkerFromName(place.name);
                            }}>{place.title}</button>
                        </li>
                    ))}
                </ul>
                <div className='contributions'>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
                </div>
            </div>
        )
    }
}

export default ElementsList