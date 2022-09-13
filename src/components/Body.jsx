import React from "react";
import Login from "./Login";
import Asider from "./Asider";
import { useEffect, useState } from 'react';
import axios from 'axios';


function Body({ token }) {


    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [data, setData] = useState([])
    const [iframe, setId] = useState("0JGOiO34nwfUdDrD612dOp")

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

                <div className="partieHeader">
                    <input className="ImputText" type="ImputText" placeholder="Recherchez l'album" onChange={e => setSearchKey(e.target.value)} />
                    <img className="buttonRecherche" onClick={searchArtists} type={"submit"} src="search.svg" alt="" />
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