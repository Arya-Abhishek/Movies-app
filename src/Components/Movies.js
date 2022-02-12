import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourite: []
        }
    }

    async componentDidMount() {
        // Runs first time, when component gets mounted after render runs
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=add79b1ccf9f8adb1b3f67f75176da6f&language=en-US&page=${this.state.currPage}`)
        const data = res.data.results
        this.setState({
            movies: [...data]
        })
    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=add79b1ccf9f8adb1b3f67f75176da6f&language=en-US&page=${this.state.currPage}`)
        const data = res.data.results
        this.setState({
            movies: [...data]
        })
    }

    handleRight = async () => {
        this.setState({
            parr: [...this.state.parr, this.state.parr.at(-1) + 1],
            currPage: this.state.currPage + 1
        }, this.changeMovies)
    }

    handleLeft = async () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage > 1 ? this.state.currPage - 1 : 1
            }, this.changeMovies)
        }
    }

    handleClick = (value) => {
        if (value != this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavouriteMovies = (movie) => {
        let oldMoviesData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        if (this.state.favourite.includes(movie.id)) {
            // If already exists, then second time is clicked for removal of the movie from favourites
            oldMoviesData = oldMoviesData.filter(m => m.id != movie.id)
        } else {
            oldMoviesData.push(movie)
        }

        localStorage.setItem('movies-app', JSON.stringify(oldMoviesData))
        console.log(oldMoviesData);
        this.handleFavouriteMoviesState();
    }

    handleFavouriteMoviesState = () => {
        let oldMoviesData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        let tempArr = oldMoviesData.map(movie => movie.id)
        this.setState({
            favourite: [...tempArr]
        })
    }

    render() {
        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className="text-center"><strong>Trending</strong></h3>
                            <div className='movies-list '>
                                {
                                    this.state.movies.map(movieObj => (
                                        <div key={movieObj.id} className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" alt="..." />
                                            {/* <div className="card-body"> */}
                                            <h1 className="card-title movies-title">{movieObj.original_title}</h1>
                                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                            <div className="button-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                {
                                                    this.state.hover == movieObj.id &&
                                                    <a className="btn btn-primary movies-btn" onClick={() => this.handleFavouriteMovies(movieObj)}>{this.state.favourite.includes(movieObj.id) ? "Remove From Favourites" : "Add to Favourites"}</a>
                                                }
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={"page-item " + (this.state.currPage != 1 ? '' : 'disabled')}><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (
                                                <li className="page-item"><a className="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
