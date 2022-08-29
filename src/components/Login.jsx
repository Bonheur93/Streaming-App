import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

function Login() {


    const clientId = "840596917270-gr97pl94hlultfofenh6o5lkt6ml33fr.apps.googleusercontent.com";

    const [showLoginButton, setShowLoginButton]= useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false)


    const onLoginSuccess = (res) =>{
        console.log("Login Success:", res.profilObj);
        setShowLoginButton(false);
        setShowLogoutButton(true)
    }

    const onFailureSuccess = (res) => {
        console.log('Login Failed:', res);
    }

    const onSignoutSuccess =() =>{
        alert("you have been loger out sucessfully")
        setShowLoginButton(true);
        setShowLogoutButton(false);
    }

    return (

        <div>
            {showLoginButton ?
            <GoogleLogin
                clientId= {clientId}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={'single_host_origin'}
            />: null
        }

            {showLogoutButton ?
            <GoogleLogout
                clientId= {clientId}
                buttonText="Logout"
                onLogoutSuccess={onSignoutSuccess}
            >
            </GoogleLogout> : null
            }

        </div>
    )

}
export default Login