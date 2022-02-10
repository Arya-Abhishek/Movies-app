import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
      <div style={{display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem', marginLeft: '1rem'}}>
          <h1>Movies App 2.0</h1>
            <h3>Favourites</h3>
      </div>
    )
  }
}

export default Navbar