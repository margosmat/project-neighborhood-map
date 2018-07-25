import React, { Component } from 'react'
import $ from 'jquery'

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
                <input
                    className='filter-input'
                    type='text'
                    placeholder='Filter places'
                />
                <ul>

                </ul>
            </div>
        )
    }
}

export default ElementsList