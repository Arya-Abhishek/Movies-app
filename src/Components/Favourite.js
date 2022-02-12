import React, { Component } from 'react'
import { movies } from './getMovies'

let genreIds = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGen: 'All Genres',
            movies: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let dataArr = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = []

        // temp = dataArr.map(movie => genreIds[movie.genre_ids[0]])
        dataArr.forEach(movie => {
            let currentGenre = genreIds[movie.genre_ids[0]]
            if (!temp.includes(currentGenre)) {
                temp.push(currentGenre)
            }
        })
        temp.unshift("All Genres")
        this.setState({
            genres: [...temp],
            movies: [...dataArr]
        })
    }

    handleDeleteMovie = (id) => {
        let moviesDataArr = this.state.movies
        let newMoviesDataArr = moviesDataArr.filter(movie => movie.id != id)
        this.setState({
            movies: [...newMoviesDataArr]
        })
        localStorage.set("movies-app", JSON.stringify(newMoviesDataArr))
    }

    sortPopularityAscending = () => {
        let currentMoviesArr = [...this.state.movies]
        currentMoviesArr.sort((first, second) => {
            return first.popularity - second.popularity;
        })

        this.setState({
            movies: [...currentMoviesArr]
        })
    }

    sortPopularityDescending = () => {
        let currentMoviesArr = this.state.movies
        currentMoviesArr.sort((first, second) => {
            return (second.popularity - first.popularity);
            // return (first.popularity - second.popularity) > 0;   Weird ??
        })

        this.setState({
            movies: [...currentMoviesArr]
        })
    }

    sortRatingAscending = () => {
        let currentMoviesArr = [...this.state.movies]
        currentMoviesArr.sort((first, second) => {
            return first.vote_average - second.vote_average;
        })

        this.setState({
            movies: [...currentMoviesArr]
        })
    }

    sortRatingDescending = () => {
        let currentMoviesArr = this.state.movies
        currentMoviesArr.sort((first, second) => {
            return (second.popularity - first.popularity);
            // return (first.popularity - second.popularity) > 0;   Weird, Since this should have worked too ??
        })

        this.setState({
            movies: [...currentMoviesArr]
        })
    }

    setGenreSelected = (genre) => {
        this.setState({
            currGen: genre
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }

    render() {

        // Will Not work, maximum depth reached error -> when state gets updated setState will get called and when setState change
        // the state then again render will be called and hence will get into an infinite loop
        // this.setState({
        //     // have to do deep copy
        //     genres: tempGenres
        // })

        let filterArrMovies = []
        if (this.state.currText == '') {
            filterArrMovies = this.state.movies
        } else {
            filterArrMovies = this.state.movies.filter((movieObj) => {
                let currentTitle = movieObj.original_title.toLowerCase();
                return currentTitle.includes(this.state.currText.toLowerCase())
            })
        }

        if (this.state.currGen != 'All Genres') {
            filterArrMovies = this.state.movies.filter((movieObj) => genreIds[movieObj.genre_ids[0]] == this.state.currGen)
        }

        let { limit, currPage } = this.state;
        let pages = Math.ceil(filterArrMovies.length / this.state.limit);
        let pagesArr = [];

        for (let i = 1; i <= pages; i++) pagesArr.push(i);

        let startIndex = (currPage - 1) * limit;
        let endIndex = startIndex + limit;
        console.log(startIndex, endIndex)
        filterArrMovies = filterArrMovies.slice(startIndex, endIndex);

        return (

            <div>
                <>
                    <div className="main-favourite-cont">
                        <div className='row'>
                            <div className='col-lg-3 favourite-genres col-sm-12'>
                                <ul className="list-group">
                                    {
                                        this.state.genres.map(genre => (
                                            <li className={"list-group-item " + (this.state.currGen == genre ? 'active' : '')} onClick={() => this.setGenreSelected(genre)} style={{ fontWeight: 'bold' }}>{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='col-lg-9 col-sm-12' style={{ padding: '3rem', paddingTop: '0' }}>
                                <div className="row">
                                    <input type="text" placeholder='Search Movie here' className='input-group-text col-6' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })}></input>
                                    <input type="number" placeholder='Rows count' className='input-group-text col-6' value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })}></input>
                                </div>
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <i className="fa-solid fa-sort-up" onClick={this.sortPopularityDescending} />
                                                    Popularity
                                                    <i className="fa-solid fa-caret-down" onClick={this.sortPopularityAscending} />
                                                </th>
                                                <th scope="col">
                                                    <i className="fa-solid fa-sort-up" onClick={this.sortRatingDescending} />
                                                    Rating
                                                    <i className="fa-solid fa-caret-down" onClick={this.sortRatingAscending} />
                                                </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterArrMovies.map((movieObj) => (
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
                                                        <td><button type="button" className="btn btn-danger" onClick={() => this.handleDeleteMovie(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {
                                                pagesArr.map(page => (
                                                    <li className="page-item"><a className="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                                ))
                                            }
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
