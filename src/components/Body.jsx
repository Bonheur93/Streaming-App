import React from "react";
import Login from "./Login";
import Asider from "./Asider";


function Body() {


    return (

        <main className="main">
            <div className="ContainerAsider">
                <Asider />
            </div>
            <div className="container" >

                <h1 className="connect">Welcome to the Sky Music</h1>
                <div className="Imghome">
                    <img className="imghome" src="imghome.jpeg" alt="" />
                </div>

                <div className="login" >
                    <Login />
                </div>

            </div>
        </main>

    )
}
export default Body

