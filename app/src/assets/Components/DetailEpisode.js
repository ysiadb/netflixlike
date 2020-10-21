import React, { Component, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa'
import { IoMdEye } from "react-icons/io";
import { ImEyePlus } from "react-icons/im";
import StarRatingComponent from 'react-star-rating-component';

let keyA = "1ae3dc8f5b19";
let keyD = ""
let key = keyA
let splitURL = window.location.href.split('/');
let id_serie = splitURL[4];

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

class Episode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: [],
            note: [],
            saison: [],
            episodes: [],
            images: [],
            comments: [],
            comment: ""
        }
    }

    componentDidMount() {
        const detailEpisode = async () => {
            axios.get('https://api.betaseries.com/episodes/display?client_id=' + keyA + '&id=' + id_serie)
                .then(response => {
                    console.log(response.data, "oeoeoeoe")
                    this.setState({
                        episodes: [response.data.episode],
                        show: Object.values(response.data.episode.show),
                        note: Object.values(response.data.episode.note),
                    })
                })
        }

        const fetchComment = async () => {
            axios.get('https://api.betaseries.com/comments/comments?client_id=' + keyA + '&id=' + id_serie + '&type=episode')
                .then(response => {
                    console.log(response.data.comments, "get commennt")
                    this.setState({
                        comments: response.data.comments
                    })
                })
        }
        fetchComment()
        detailEpisode()
    }


    handleSubmitVue = async (id) => {
        await axios.post('https://api.betaseries.com/episodes/watched?id=' + id + '&token=' + localStorage.getItem('token') + '&client_id=' + key + "&bulk=" + false)
            .then(response => {
                console.log(response.data, "vuuuuue")
            })
    }

    handleSubmitAllVue = async (id) => {
        await axios.post('https://api.betaseries.com/episodes/watched?id=' + id + '&token=' + localStorage.getItem('token') + '&client_id=' + key)
            .then(response => {
                console.log(response.data, "toutvuuuuue")
            })
    }

    handleSubmitComment = async (comment, id) => {
        let requete = 'https://api.betaseries.com/comments/comment?client_id=' + key + '&token=' + localStorage.getItem('token') + '&id=' + id + '&text=' + comment + '&type=episode'
        console.log(requete, 'requeeeeete');
        await axios.post(requete)
            .then(response => {
                console.log(response.data, 'REGARDE LAAAAAA')
            })
    }

    handleChange = async (event) => {
        this.setState({
            comment: event.target.value,
        });
    }

    render() {
        // console.log(this.state.show, "wwwwwwwwwwwww");
        return (
            <section className="Episode">
                <div className="container">
                    <div className="episode_header">

                        <div className="main_info">
                            <img src={'https://api.betaseries.com/pictures/episodes?client_id=' + keyA + '&id=' + id_serie} />
                        </div>

                        <div className="episode">
                            {
                                this.state.episodes.map(show => {
                                    // console.log(this.state.shows,'yooooooooooo');

                                    return (

                                        <div className="col-12 detail">
                                            <h1>{this.state.show[2]} {show.title}</h1>
                                            <IoMdEye size="2rem" onClick={event => this.handleSubmitVue(show.id)} />
                                            <ImEyePlus size="2rem" onClick={event => this.handleSubmitAllVue(show.id)} style={{ marginLeft: '10px' }} />
                                            <div style={{ display: 'flex' }}>
                                                <div >
                                                    <p style={{ width: '600px' }}>{show.description}</p>
                                                </div>
                                                <div style={{ marginLeft: '600px' }}>
                                                    {/* <img src={show.images.show}/> */}
                                                </div>
                                            </div>

                                            <div>
                                                <StarRating />
                                                <p>( Note: {Math.round(this.state.note[1]*10)/10} )</p>
                                            </div>

                                            {/* <form onSubmit={event => { event.preventDefault(); this.handleSubmitComment(this.state.comment, show.id) }}>
                                                <input type="textarea" name="comment" value={this.state.comment} onChange={event => this.handleChange(event)} />

                                                <button type="submit">Comment</button>
                                            </form> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="body_comments">
                        {this.state.episodes.map(show => {
                            return (

                                <form onSubmit={event => { event.preventDefault(); this.handleSubmitComment(this.state.comment, show.id) }}>
                                    <input type="textarea" name="comment" value={this.state.comment} onChange={event => this.handleChange(event)} />

                                    <button type="submit">Comment</button>
                                </form>
                            )
                        })}
                        <h1>Commentaire</h1>
                        {
                            this.state.comments.map(comment => {
                                return (
                                    <div className="col-12 detail">
                                        <div style={{ border: 'solid white', marginBottom: '20px', padding: '30px' }}>
                                            <h3>{comment.login}</h3>
                                            <p>{comment.text}</p>
                                            <p>le {comment.date}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </section>
        )
    }
}

export default Episode;