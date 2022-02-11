import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    render() {

        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        const moviesList = movies.results
        console.log(moviesList);
        return (


            <div>
                <>
                    <div className="main-favourite-cont">
                        <div className='row'>
                            <div className='col-3 favourite-genres'>
                                <ul class="list-group">
                                    <li class="list-group-item">All Genres</li>
                                    <li class="list-group-item">Action</li>
                                    <li class="list-group-item">Thriller</li>
                                    <li class="list-group-item">Fantasy</li>
                                    <li class="list-group-item">Sci Fiction</li>
                                </ul>
                            </div>
                            <div className='col-9'>
                                <div className="row">
                                    <input type="text" placeholder='Search Movie here' className='input-group-text col-6'></input>
                                    <input type="number" placeholder='No of results want' className='input-group-text col-6'></input>
                                </div>
                                <div className="row">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">Popularity</th>
                                                <th scope="col">Rating</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                moviesList.map((movieObj, currIdx) => (
                                                    <tr>
                                                        <th scope="row">
                                                            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} alt="" className="table-row-image" />
                                                            {movieObj.original_title
                                                            }</th>
                                                        <td>
                                                            {genreids[movieObj.genre_ids[0]]}
                                                        </td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-danger">Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
