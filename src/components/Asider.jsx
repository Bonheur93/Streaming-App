import React from "react";
// import { icons } from "react-icons";
import {FaUser} from "react-icons/fa"



function Asider() {

  return (
    <div className="containerAside">

      <div className="logoasider">

        <img className="bonlogo" src="bonlogo.jpg" alt="" />
        <p>Authentic Music</p>
      </div>
      <div className="bibliothec">
        <div className="containerLibrairie">
        <div className="Library">
          <img className="library" src="home.svg" alt="" />
          <a href="#" className="lienRef"><h5>Accueil</h5></a>
        </div>
        <div className="Library">
          <img className="library" src="library.svg" alt="" />
          <a href="#" className="lienRef"><h5>Bibliothèque</h5></a>
        </div>
        <div className="Library">
        <img className="library" src="person.svg" alt="" />
        <a href="#" className="lienRef"><h5>Aritste</h5></a>
        </div>
        <div className="Library">
          <img className="library" src="playlist_play.svg" alt="" />
          <a href="#" className="lienRef"><h5>Playlist</h5></a>
        </div>
        </div>
        
      </div>
    </div>

  )
}
export default Asider