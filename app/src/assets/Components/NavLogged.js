import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

const NavLogged = () => (
    <Router>
        <section className="Nav">

            {/* <p className="Logo navbar-brand col-md-1 col-sm-1 col-xs-5"> */}
            <a href={"/home"}><h1 id="logo">Previously On</h1></a>

            {/* </p> */}

                <ul class="col-5">

                    <li>
                        <a href={"/Series"}>
                            SERIES
                        </a>
                    </li>

                    <li>
                        <a href={"/Profil"}>
                            PROFIL
                        </a>
                    </li>

                    <li>
                        <a href={"/LogOut"}>
                            DECONNEXION
                        </a>
                    </li>

                    <li>
                        <a href={'/Profile#profile'}>
                            <div className="profile_nav"></div>
                        </a>
                    </li>

                </ul>
        </section>
    </Router>


)

export default NavLogged;