import React, { Component } from 'react'

class ElementsList extends Component {
    render() {
        return (
            <div className='elements-list-container'>
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