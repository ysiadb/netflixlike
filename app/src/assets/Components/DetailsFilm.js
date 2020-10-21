import React, { Component, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa'
import { FcPlus } from "react-icons/fc";

import StarRatingComponent from 'react-star-rating-component';


let keyA = "1ae3dc8f5b19";
let keyD = ""
let key = keyA
let splitURL = window.location.href.split('/');
let id_film = splitURL[4];

const StarRating = () => {
    // const [rating, setRating = useState(null)]
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                        // onClick={() => setRating(ratingValue)}
                        />
                        <FaStar className="star" size={20} />
                    </label>
                )
            })}
        </div>
    )
}

class Film extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nosFilms: [],
            genres: [],
            note: []
            // rating: 1
        }
    }

    componentDidMount() {
        const dataNew = async () => {
            axios.get('https://api.betaseries.com/movies/member?client_id=' + keyA + '&id=' + id_film)
                .then(response => {
                    console.log(response.data, "Nos films")
                    this.setState({
                        nosFilms: [response.data.show],
                        // genres: Object.values(response.data.show.genres).join(','),
                        // note: Object.values(response.data.show.notes)
                    })
                })
        }
        dataNew();
    }


    handleSubmitSerie = async (id) => {
        await axios.post('https://api.betaseries.com/shows/show?id=' + id + '&token=' + localStorage.getItem('token') + '&client_id=' + key)
            .then(response => {
                console.log(response.data, "oeoeoeoe")

            })
    }


    // handleSubmitSerie = async (id) => {
    //     console.log(id,'aiiiiiiiiiiiie');
    //     await axios.post('https://api.betaseries.com/shows/favorite?id='+id+'&token='+localStorage.getItem('token')+'&client_id='+key)
    //         .then(response => {
    //             console.log(response, "rrrrrrrrrrrrr");
    //             alert('Film ajouter à mes favoris')
    //     })
    // }

    render() {
        console.log(this.state.show, "wwwwwwwwwwwww");
        return (

            <section className="Profil">
                <div className="container">
                    <div className="main_info col-12">
                    </div>

                    <div className="profil_menu col-12">
                        {
                            this.state.show.map(showw => {
                                // console.log(this.state.shows,'yooooooooooo');

                                return (

                                    <div className=" detail">
                                        <img src={showw.images.show} />
                                        <h1>{showw.title}</h1>
                                        <FcPlus size="1rem" onClick={event => this.handleSubmitSerie(showw.id)} />
                                        <div className="info_body">
                                            <div className="col-7">
                                                <div>
                                                    <h3>Description</h3>
                                                    <p>{showw.description}</p>
                                                </div>
                                                <div>
                                                    <StarRating />
                                                    <p>( Note: {this.state.note[1]} )</p>
                                                </div>

                                                <div>
                                                    <h3>Genre(s)</h3>

                                                    <p>{this.state.genres}</p>
                                                </div>
                                                <h3>Nombre d'épisodes: </h3>

                                                {/* <div>
                                                    <p>Nombre de saison: {showw.seasons}</p>
                                                </div> */}
                                                <div>
                                                    <p>{showw.episodes} ( {showw.seasons} saison(s) )</p>
                                                </div>
                                            </div>

                                            {/* <p>{showw.production_year}</p> */}
                                            {/* <div className="like">
                                <input id="toggle-heart" type="checkbox" />
                                <label for="toggle-heart" aria-label="like" onClick={event => this.handleSubmitFav(showw.id)}>❤</label>
                                </div>                             */}

                                            <div className="col-5">
                                                <img src={showw.images.poster} />

                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>

                    <div id='info' style={{ display: 'none' }}>
                        blablablablabla
                    </div>
                </div>

            </section>
        )
    }
}

export default Film;