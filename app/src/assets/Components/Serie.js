import React, { Component } from 'react';
import axios from 'axios';

let keyA = "1ae3dc8f5b19";
let keyD = ""
let key = keyA
class Series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shows: []
        }
    }

    componentDidMount() {
        const dataNew = async () => {
            axios.get('https://api.betaseries.com/shows/list?client_id=' + keyA)
                .then(response => {
                    console.log(response.data.shows, "oeoeoeoe")
                    this.setState({
                        shows: response.data.shows
                    })

                })
        }
        dataNew();
    }

    handleSubmitFav = async (id) => {
        console.log(id, 'aiiiiiiiiiiiie');
        await axios.post('https://api.betaseries.com/shows/favorite?id=' + id + '&token=' + localStorage.getItem('token') + '&client_id=' + key)
            .then(response => {
                console.log(response, "rrrrrrrrrrrrr");
                alert('Film ajouter à mes favoris')
            })
    }

    render() {
        return (

            <section className="Profil">
                <h1>Séries</h1>

                <div className="container">
                    <div className="main_info_serie col-12">

                        {
                            this.state.shows.map(show => {
                                // console.log(this.state.shows,'yooooooooooo');

                                return (

                                    <div className="col-5 detail">
                                        {/* <h1>{info.director}</h1> */}
                                        <img src={show.images.show} />
                                        <div className="info_body">

                                            <h2>{show.title}</h2>
                                            <p>{show.description}</p>
                                            <div className="like">
                                                <input id="toggle-heart" type="checkbox" />
                                                <label for="toggle-heart" aria-label="like" onClick={event => this.handleSubmitFav(show.id)}>❤</label>
                                            </div>
                                            <a href={"/Serie/" + show.id}>En savoir plus</a>
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

export default Series;