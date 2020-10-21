import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


//CSS
import './App.css';
import './assets/CSS/style.css'
import './assets/CSS/bootstrap-grid.css';


//Pages
import Nav from './assets/Components/Navbar'
import NavLogged from './assets/Components/NavLogged';
import LogOut from './assets/Components/LogOut';
import Footer from './assets/Components/Footer'
import Profil from './assets/Components/Profil'
import Home from './assets/Components/Home'
import Popup from './assets/Components/Popup'

import Series from './assets/Components/Serie'
import Serie from './assets/Components/DetailSerie'
import Episode from './assets/Components/DetailEpisode'
import Film from './assets/Components/DetailsFilm'





function NavOk() {
  if (localStorage.getItem("token")) {
    return <NavLogged />
  }
  else {
    return <Nav />
  }
}

function App() {

  return (
    <div className="App">
      <Router>
        <NavOk />

        <Route path="/" exact render={
          () => {
            return (
              <div>

                <Home />
                <Popup />
              </div>

            )
          }
        } />

        <Route path="/Home" render={
          () => {
            return (
              <div>

                <Home />
                <Popup />
              </div>

            )
          }
        } />

        <Route path="/Series" render={
          () => {
            return (
              <div>
                <Series />
                <Popup />

              </div>
            )
          }
        } />

        <Route path="/Profil" render={
          () => {
            return (
              <div>
                <Profil />
              </div>
            )
          }
        } />

        <Route path="/Serie" render={
          () => {
            return (
              <div>
                <Serie />
                <Popup />

              </div>
            )
          }
        } />

        <Route path="/Episode" render={
          () => {
            return (
              <div>
                <Episode />
              </div>
            )
          }
        } />

        <Route path="/Film" render={
          () => {
            return (
              <div>
                <Film />
              </div>
            )
          }
        } />

        <Route path="/LogOut" render={
          () => {
            return (
              <div>
                <LogOut />
              </div>
            )
          }
        } />

        <Footer />
      </Router>
    </div>
  );

}

export default App