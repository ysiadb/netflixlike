import React from 'react';
import axios from 'axios';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

let keyD = ""
let keyA = "1ae3dc8f5b19"
let key = keyA

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // FILM
            newtowatch: [],
            infofilm: [],
            id_film: null,
            new_filmid: null,
            affiche_film: null,
            platform_links: [],
            testserie: [],

            // SERIE

            newSerie: [],
            infoserie: [],
            id_serie: null,
            affiche_serie: null,
            testmovie: [],


            // MES SERIES

            mesSeries: [] ,
        };
    }

    componentDidMount() {
        const dataNew = async () => {
            axios.get('https://api.betaseries.com/movies/discover?key=e3e70c22019e&type=popular')
                .then(response => {
                    // console.log(response, "RESPONSE")
                    // console.log(response.data.movies, "RESPONSE length")

                    this.setState({
                        newtowatch: response.data.movies,
                        // new_filmid: response.data.movies.id
                    })

                    let i;
                    for (i = 0; i < this.state.newtowatch.length; i++) {
                        this.getmovie(this.state.newtowatch[i].id)
                    }

                    console.log(this.state.testmovie, "TEST")
                    // console.log(`https://api.betaseries.com/movies/movie?key=e3e70c22019e&id=${this.state.new_filmid}`, "IDDD ICI")
                })
        }

        const SerieNew = async () => {
            axios.get('https://api.betaseries.com/shows/list?client_id=' + keyA)
                .then(response => {
                    console.log(response.data.shows, "oeoeoeoe")

                    this.setState({
                        newSerie: response.data.shows
                    })

                    // let i;
                    // for (i = 0; i < this.state.newSerie.length; i++) {
                    //     this.getSerie(this.state.newSerie[i].id)
                    // }

                })


        }



        const MesSeries = async () => {
            axios.get('https://api.betaseries.com/shows/member?id=' + localStorage.getItem('id_user') + '&client_id=' + keyA)
            .then(response => {
                console.log(response.data.shows, "je teste")
                this.setState({
                    mesSeries: response.data.shows
                })
            })
        }
        // console.log(`e3e70c22019e&id=${this.state.new_filmid}`, "LAAAAAAA")
        dataNew();
        SerieNew();
        MesSeries();


    }

    getmovie(id) {
        axios.get(`https://api.betaseries.com/movies/movie?key=e3e70c22019e&id=${id}`)
            .then(response => {
                // console.log(response, "RESPONSE 2")
                this.state.testmovie.push({ infofilm: response.data.movie, affiche_film: response.data.movie.backdrop, platform_links: response.data.movie.platform_links })
                this.setState({
                    testmovie: this.state.testmovie,
                })
            })
    }

    handleSubmit = async (id) => {
        console.log(id, 'teeeest');
        console.log(localStorage.getItem('token'), 'rrrrrrrrrr');
        await axios.post('https://api.betaseries.com/movies/movie?id=' + id + '&token=' + localStorage.getItem('token') + '&client_id=' + key)
            .then(response => {
                alert('Film ajouté')
            })
    }

    handleSubmitAll = async (id) => {
        await axios.post('https://api.betaseries.com/movies/movie?id=' + id + '&token=' + localStorage.getItem('token') + '&client_id=' + key)
            .then(response => {
                return (
                    alert('Film ajouté !!!!')
                )
            })
    }

    handleSubmitSerie = async (id) => {
        await axios.post('https://api.betaseries.com/shows/show?id='+id+'&token='+localStorage.getItem('token')+'&client_id='+key)
        .then(response => {
        console.log(response.data, "check")
        
        })
        }




    render() {

        return (
            <section className="homepage">

                <div className="container-fluid">
                    {/* {console.log(this.state.testmovie.infofilm, "INFOFIIIIILM")} */}
                    <div className="slide-container">
                        <Slide>
                            {this.state.testmovie.map(films => {
                                // console.log(films.infofilm.id,'rrrrrrrrrrrrrrrrrrrrrrrrrrr');
                                return (

                                    <section className="each-slide">
                                        <img src={films.infofilm.backdrop} />
                                        <div className="main_info">
                                            <h1>{films.infofilm.title}</h1>
                                            <h4>by {films.infofilm.director}</h4>
                                            <p>{films.infofilm.synopsis}</p>

                                            <button onClick={event => this.handleSubmit(films.infofilm.id)} type="submit">Ajouter ce film</button>
                                        </div>
                                    </section>
                                )
                            })}
                        </Slide>

                        {/* <div className="test">
                            <img src={this.state.infofilm.backdrop} />
                            <div className="main_info">
                                <h1>{this.state.infofilm.title}</h1>
                                <h4>by {this.state.infofilm.director}</h4>
                                <p>{this.state.infofilm.synopsis}</p>

                                <button onClick={this.handleSubmit} type="submit">Ajouter ce film</button>
                            </div> */}
                        <div className="linkstowatch">
                            {/* {console.log(this.state.platform_links, "PLATFORM ______ ")} */}

                            {/* 
                            {if(this.state.platform_links != null)
                            {

                            }
                            }
                            {this.state.platform_links.map(linkss => {
                                { console.log(linkss.url, 'URRRRRRRLLLLLL'); }
                                
                                switch (linkss.platform) {
                                    case "Apple iTunes":
                                        return (
                                            <a href={linkss.url}><img src={"../images/apple.jpeg"} /></a>
                                        )
                                    case "Canal Play VOD":
                                        return (
                                            <a href={linkss.url}><img src={"../images/CPVOD.png"} /></a>
                                        )
                                    case "Google Play Movies":
                                        return (
                                            <a href={linkss.url}><img src={"../images/GPMovie.png"} /></a>
                                        )
                                    case "Microsoft Store":
                                        return (
                                            <a href={linkss.url}><img src={"../images/GPMovie.png"} /></a>
                                        )

                                }
                            })} */}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <h2>Films récents</h2>
                    <div className="new">
                        {this.state.testmovie.map(film => {
                            return (

                                <div className="col-3 detail">
                                    {/* <h1>{info.director}</h1> */}
                                    <img src={film.affiche_film} />
                                    <h2>{film.infofilm.title}</h2>
                                    <infos>by {film.infofilm.director}</infos>

                                    <p>{film.infofilm.synopsis}</p>
                                    <infos>Rejoignez les {film.infofilm.followers} fans !</infos>
                                    <div className="buttons">
                                        <button>Voir la fiche</button>
                                        <button className="btn_add" id={film.infofilm.id} onClick={event => this.handleSubmitAll(film.infofilm.id)} type="submit">+</button>
                                    </div>

                                </div>
                            )

                        })}
                    </div>
                    <h2>Séries récentes</h2>
                    <div className="new">
                        {console.log(this.state.newSerie, "NEW SERIIIIE")}
                        {this.state.newSerie.map(serie => {
                            return (

                                <div className="col-3 detail">
                                    <img src={serie.images.show} />
                                    <h2>{serie.title}</h2>
                                    <p>{serie.description}</p>
                                    <div className="buttons">
                                        <button>Voir la fiche</button>
                                        <button className="btn_add" id={serie.id} onClick={event => this.handleSubmitSerie(serie.id)} type="submit">+</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <h2>Reprendre avec mon profil</h2>
                    <div className="new">
                    {console.log(this.state.mesSeries, "SHOW")}
                    {this.state.mesSeries.map(mine => {
                        return (

                            <div className="col-3 detail">
                                {/* <h1>{info.director}</h1> */}
                                <img src={mine.images.show} />
                                <div className="main">
                                    <h2>{mine.title}</h2>
                                    <p>{mine.production_year}</p>
                                    <p>{mine.description}</p>
                                    <a href={"/Serie/" + mine.id}>En savoir plus</a>
                                </div>
                            </div>
                        )
                    })
                    }
                    </div>


                </div>
                {/* </div> */}
            </section >
        )
    }
}


export default Home;