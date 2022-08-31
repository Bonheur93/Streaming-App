import React from "react";
import Login from "./Login";
import Asider from "./Asider";
import { useEffect, useState } from 'react';
import axios from 'axios';




function Body() {

    const CLIENT_ID = "93f33402d44f4128935734c09ea4fc41"
    const REDIRECT_URI = "http://localhost:5173"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const [token, setToken] = useState("")

    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    const searchArtists = async (e) => {
        e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })

        setArtists(data.tracks.items)
    }
    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.album.images.length ? <img width={"25%"} src={artist.album.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.uri}
            </div>
        ))
    }


    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    return (

        <main className="main">
            <div className="ContainerAsider">
                <Asider />
            </div>


            <div className="container" >
                <header>
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Connectez-vous sur spotify</a>
                    <form onSubmit={searchArtists}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)} />
                        <button type={"submit"}>Search</button>
                    </form>
                    <div className="artist">
                    {renderArtists()}
                    </div>
                    
                </header>

                <h1 className="connect">Welcome to the Sky Music</h1>

                <div className="login" >

                    <Login />
                </div>

            </div>
        </main>

    )
}
export default Body

