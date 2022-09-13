// import React from "react";
import Body from "./Body";
import { useEffect, useState } from 'react';
import '../index.css'


function LoginToSpotify({token, setToken}) {
    const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt"

    const CLIENT_ID = "93f33402d44f4128935734c09ea4fc41"
    const REDIRECT_URI = "http://localhost:5173"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-currently-playing", "user-read-playback-state", "playlist-read-private"];

    useEffect(() => {
        const hash = window.location.hash
        
        let token = window.localStorage.getItem("accessToken")
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
        if (hash) {
          const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("accessToken", token)
            setToken(token)
        }
        console.log(token)
    }, []);

    return (
    <div className="connectToSpotify" >
        <img className="library" src="login.svg" alt="" />
       <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Connectez-vous pour Jouer</a></button> 

    </div>)

}
export default LoginToSpotify