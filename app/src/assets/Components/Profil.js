import React, { Component } from 'react';
import axios from 'axios';
import Search from './SearchMember'

let keyA = "1ae3dc8f5b19";
let keyD = ""
let key = keyA



//ONGLETS
let splitURL = window.location.href.split('/');
let ongletName = splitURL[4];
class Gestion_Amis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            member_infos: [],
            id: null,
            login: "",
            stats: [],
            friends: [],
            shows: "",
            seasons: "",
            episodes: ""
        }
    }

    componentDidMount() {
        const dataFriend = async () => {
            axios.get('https://api.betaseries.com/friends/list?id=' + localStorage.getItem('id_user') + '&client_id=' + key + '&token=' + localStorage.getItem('token'))
                .then(response => {
                    console.log(response.data.users, "amiiiiiis")
                    this.setState({
                        friends: response.data.users,
                        //     stats: response.data.member.stats,
                    })
                })
        }
        dataFriend();
    }

    render() {
        return (
            <div className="Details_amis">
                <Search />
                {console.log(this.state.friends, "CHECK LA")}

                {this.state.friends.map(ami => {
                        return (

                            <div className="col-3 detail">
                                {/* <h1>{info.director}</h1> */}
                                {/* <img src={ami.images.ami} /> */}
                                <div className="main">
                                    <h2>Mes amis</h2>
                                    <li>{ami.login}</li>
                                    {/* <p>{ami.production_year}</p>
                                    <p>{ami.description}</p>
                                    <a href={"/Serie/" + ami.id}>En savoir plus</a> */}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}


class Gestion_infos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            member_infos: [],
            id: null,
            login: "",
            stats: [],
            friends: "",
            shows: "",
            seasons: "",
            episodes: ""
        }
    }

    componentDidMount() {
        const dataMembre = async () => {
            axios.get('https://api.betaseries.com/members/infos?id=' + localStorage.getItem('id_user') + '&client_id=' + keyA)
                .then(response => {
                    console.log(response.data, "memmmmmmmmmbres")
                    this.setState({
                        member_infos: response.data.member,
                        stats: response.data.member.stats,
                    })
                })
        }
        dataMembre();
    }

    render() {
        return (

            <div className="Details_infos">
                {console.log(this.state.member_infos, "CHECK LA")}

                <div className="col-3 detail">
                    {/* <h1>{info.director}</h1> */}
                    <div className="main">

                        {/* <h2>{this.state.member_infos.login}</h2> */}
                        <h2>Stats de {this.state.member_infos.login} </h2>

                        <p>{this.state.stats.friends} ami(s) </p>


                        <p>{this.state.stats.shows} films regardés</p>

                        <p>{this.state.stats.seasons} saisons vues</p>
                        <p>{this.state.stats.episodes} épisodes vus</p>




                        {/* <p>{info.stats.shows}</p> */}
                    </div>
                </div>

            </div>
        )
    }
}


class Gestion_series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shows: [],

        }
    }

    componentDidMount() {
        const dataNew = async () => {
            axios.get('https://api.betaseries.com/shows/member?id=' + localStorage.getItem('id_user') + '&client_id=' + keyA)
                .then(response => {
                    console.log(response.data.shows, "oeoeoeoe")
                    this.setState({
                        shows: response.data.shows
                    })
                })
        }
        dataNew();
    }

    render() {
        return (
            <div>
                <h2>Mes séries</h2>
                <div className="Details_serie">

                    {console.log(this.state.shows, "SHOW")}
                    {this.state.shows.map(show => {
                        return (

                            <div className="col-3 detail">
                                {/* <h1>{info.director}</h1> */}
                                <img src={show.images.show} />
                                <div className="main">
                                    <h2>{show.title}</h2>
                                    <p>{show.production_year}</p>
                                    <p>{show.description}</p>
                                    <a href={"/Serie/" + show.id}>En savoir plus</a>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}


function Onglets() {
    return (
        <section className="ongletsAdmin col-12">
            <a href="/Profil/amis">
                <div className="button">
                    Gerer mes amis
                </div>
            </a>

            <a href="/Profil/infos">
                <div className="button">
                    Gérer mes infos // Voir mes stats
                </div>
            </a>

            <a href="/Profil/series">
                <div className="button">
                    Gérer  mes series
                </div>
            </a>
        </section>
    )
}

function Board() {
    switch (ongletName) {
        case "amis":
            return (
                <div className="board col-12">
                    <Gestion_Amis />
                </div>
            )
            break;

        case "infos":
            return (
                <div className="board col-12">
                    <Gestion_infos />
                </div>
            )
            break;

        case "series":
            return (
                <div className="board col-12">
                    <Gestion_series />
                </div>
            )
            break;

        default:
            return (
                <div className="board col-12">

                </div>
            )
    }
}


const Profil = () => (
    <section className="Profil">

        <h1>Modifier mon profil</h1>

        <div className="container">
            <div className="main_info col-12">
                <img id="avatar" src="https://www.inbenta.com/wp-content/themes/inbenta/img/icons/avatar.svg?ver=2"></img>
                <h5>{localStorage.getItem('User')}</h5>
                <hr />
            </div>
            <div className="interfaceAdmin">
                <Onglets />
                <Board />
            </div>


        </div>
    </section>
)

export default Profil;