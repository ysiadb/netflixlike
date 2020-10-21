import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FcCancel, FcPlus } from "react-icons/fc";

let keyD=""
let keyA="1ae3dc8f5b19"
let key=keyA

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            membres: [],
            login:""
        };
    }

    handleChange = (event) => {
        this.setState({
          login: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get('https://api.betaseries.com/members/search?limit=10&client_id=1ae3dc8f5b19&login='+this.state.login).then(membres => {
            let member = membres.data.users
            // console.log(member,'rrrrrrrrrrraaah');
             console.log(member[0].login,'apiiiii');
            this.setState({
                membres: membres.data.users,
            })
        })
        .catch((error) => {
            console.log(error);
          })
    }

    handleSubmitBlock = async (id) => {
        await axios.post('https://api.betaseries.com/friends/block?id='+id+'&token='+localStorage.getItem('token')+'&client_id='+key)
            .then(response => {
                alert('Membre bloquer')
        })
    }

    handleSubmitAdd = async (id) => {
        await axios.post('https://api.betaseries.com/friends/friend?id='+id+'&token='+localStorage.getItem('token')+'&client_id='+key)
            .then(response => {
                alert('Membre ajouter')
        })

        // await axios.get('https://api.betaseries.com/friends/requests?token=44f37d848b5b&client_id=1ae3dc8f5b19')
        // .then(res =>{
        //     console.log(res,'quel by');
        // })
    }

    render() {
        // console.log(this.state.membres,'sisiiiiiii');
        if (this.state.membres.length != 0) {
            // console.log(this.state.membres, "membres")
            var membres = this.state.membres.map(membre => {
              console.log(membre.id, 'dataaaaaaaa');
              return (
                    <div className="infos">
                        <h4>Membre</h4>
                        <p id="text">{membre.login} 
                        <FcCancel size="1rem" onClick={event => this.handleSubmitBlock(membre.id)} />
                        <FcPlus size="1rem" onClick={event => this.handleSubmitAdd(membre.id)}/>
                        </p>
                    </div>
              )
            })
        }
        return (
            <div>
                <h2>Rechercher un ami</h2>
                <Form className="member_search" onSubmit={this.handleSubmit}>
                    <Form.Group>
                    <Form.Control type="text" id="location" placeholder="cherchez un ami(e)" value={this.state.login} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="light" type="submit">Search</Button>
                </Form>

                <div className="result">
                    {membres}
                </div>
            </div>
        )
    }

}

export default Search