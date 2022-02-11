import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGen: 'All Genres'
        }
    }

    sortPopularityHigherFirst = () => {

    }

    setGenreSelectedColor = (genre) => {
        this.setState({
            currGen: genre
        })
    }

    render() {

        let genreIds = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        const moviesList = movies.results;

        let tempGenres = []
        // Fill all the genres of the current movies
        moviesList.forEach(movieObj => {
            let currentGenre = genreIds[movieObj.genre_ids[0]]
            if (!tempGenres.includes(currentGenre)) {
                tempGenres.push(currentGenre)
            }
        })

        tempGenres.unshift('All Genres')

        // Will Not work, maximum depth reached

        // this.setState({
        //     // have to do deep copy
        //     genres: tempGenres
        // })

        console.log(moviesList);

        return (

            <div>
                <>
                    <div className="main-favourite-cont">
                        <div className='row'>
                            <div className='col-3 favourite-genres'>
                                <ul className="list-group">
                                    {
                                        tempGenres.map(genre => (
                                            <li className={"list-group-item " + (this.state.currGen == genre ? 'active' : '')} onClick={() => this.setGenreSelectedColor(genre)} style={{ fontWeight: 'bold' }}>{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='col-9'>
                                <div className="row">
                                    <input type="text" placeholder='Search Movie here' className='input-group-text col-6'></input>
                                    <input type="number" placeholder='Rows count' className='input-group-text col-6'></input>
                                </div>
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <a onClick={this.sortPopularityHigherFirst}><i className="fa-solid fa-sort-up" /></a>
                                                    Popularity
                                                    <a onClick={this.sortPopularityLowerFirst}><i className="fa-solid fa-caret-down" /></a>
                                                </th>
                                                <th scope="col">
                                                    <i className="fa-solid fa-sort-up"></i>
                                                    Rating
                                                    <i className="fa-solid fa-caret-down"></i>
                                                </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                moviesList.map((movieObj, currIdx) => (
                                                    <tr>
                                                        <th scope="row">
                                                            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} alt="" className="table-row-image" />
                                                            {movieObj.original_title}
                                                        </th>
                                                        <td>
                                                            {genreIds[movieObj.genre_ids[0]]}
                                                        </td>
                                                        <td>
                                                            {movieObj.popularity}
                                                        </td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" className="btn btn-danger">Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
