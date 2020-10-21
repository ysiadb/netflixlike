import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Login from './Login'


class Nav extends Component {
    constructor() { 
        super(); 

        this.state = { 
            showPopup: false,
         }; 
        } 
        
        togglePopup() {
            this.setState({
                showPopup: !this.state.showPopup,
            });
        }  

        render() {
        return (
            <section className="Nav">
                <a href={"/home"}><h1 id="logo">Previously On</h1></a>
                <ul className="col-5">
                    <li className="sign_button">
                    {/* <FontAwesomeIcon icon="coffee" /> */}
                        <a href="https://www.betaseries.com/inscription/">INSCRIPTION</a> 
                    </li>

                    <li className="log_button" /*onClick={this.togglePopup.bind(this)}*/>
                        CONNEXION
                    </li>
                        {this.state.showPopup ? 
                        <Login/>
                        : null
                        }    

                    <li>
                        <a href={"/Series"}>
                            SERIES
                        </a>
                    </li>
                </ul>
            </section>
        )
    }
}

export default Nav;