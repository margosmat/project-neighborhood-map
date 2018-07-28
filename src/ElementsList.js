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
                />
                <ul className='places-list'>
                    {this.props.places.length && this.props.places.sort(sortBy('name')).map((place) => (
                        <li key={place.id}>
                            <button onClick={() => {
                                $('.elements-list-container').toggleClass('elements-list-opened');
                                $('.nav-button').toggleClass('elements-list-opened');

                                this.props.changeActiveMarkerIcon(place.name);
                            }}>{place.name}</button>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        )
    }
}

export default ElementsList