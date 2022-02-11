import React, { Component } from 'react'
import './App.css';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';

export class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        {/* <Banner />
        <Movies /> */}

        <Favourite />
      </>
    )
  }
}

export default App