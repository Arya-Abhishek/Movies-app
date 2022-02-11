import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem', marginLeft: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}><h1>Movies App</h1></Link>
        <Link to="/favourites" style={{ textDecoration: 'none' }}><h2>Favourites</h2></Link>
      </div>
    )
  }
}

export default Navbar