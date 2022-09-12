import React from "react";
import Login from "./Login";
import Asider from "./Asider";
import { useEffect, useState } from 'react';
import axios from 'axios';





function Body() {

    const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt"

    const CLIENT_ID = "93f33402d44f4128935734c09ea4fc41"
    const REDIRECT_URI = "http://localhost:5173"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-currently-playing", "user-read-playback-state", "playlist-read-private"];
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [data, setData] = useState([])
    const [iframe, setId] = useState("")

    const handleGetPlaylist = () => {
        axios
            .get(PLAYLIST_ENDPOINT, {
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
        // .catch(error) => {
        //     console.log(error);

        // }
    };


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
        // function handelFunction(){
        //             document.getElementById('lll').style.display="inherit"
        //             document.getElementById('m').style.display="none"
        // }
        return artists.map((artist) => (
            <div key={artist.id} >
                {artist.album.images.length ? (
                    <div className="imgIframe" onClick={() => { setId(artist.album.id) }}>
                        <>
                            <img className="ImgArtist" width={250} src={artist.album.images[0].url} alt="" />
                        </>
                    </div>

                ) : (
                    <div>No Image</div>
                )}
                <div className="ArtistName">
                    {artist.name}
                </div>

            </div>
        ));
    }

    const renderPlaylist = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={100} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
            </div>
        ))
    }


    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, []);



    return (

        <div className="principal">
            <div className="ContainerAsider">
                <Asider />

                <iframe className="iframe" style={{ borderRadius: "1px" }} src={`https://open.spotify.com/embed/album/${iframe}?utm_source=generator`}
                    width="90%"
                    height="330px"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>

            </div>

            <div className="header">
                <div className="connectToSpotify" >
                    <img className="library" src="login.svg" alt="" />
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Connectez-vous</a>

                </div>
                <div className="partieHeader">
                    <input className="ImputText" type="ImputText" onChange={e => setSearchKey(e.target.value)} />
                    <button onClick={searchArtists} type={"submit"}>recherche</button>
                </div>

                <form className="form" onSubmit={searchArtists}>


                    <div className="ContainerArtistes">
                        {/* <div className="lds-ripple"><div></div><div></div></div> */}
                        {renderArtists()}
                        {/* {renderPlaylist()} */}
                    </div>


                </form>

            </div>

            {/* <div className="footer">
                <div>
                    <img className="library" src="skip_previous.svg" alt="" />
                    <img className="library" src="play_circle.svg" alt="" />
                    <img className="library" src="skip_next.svg" alt="" />
                </div>

            </div> */}

        </div>





    )
}
export default Body