import React, { Component } from 'react'

export default class Favourite extends Component {
  render() {
    return (
      <div>
            <>
                <div className="main">
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
                                <input type="number" className='input-group-text col-6'></input>
                            </div>
                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                    </table>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
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
