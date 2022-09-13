import { useState } from 'react'
import './index.css'
import './App.css'
import LoginToSpotify from './components/LoginToSpotify'
import Body from './components/Body'
import Login from './components/Login'



function App() {
  const [token, setToken] = useState("")
 
  return(
    <div className="LoginToSpotify">
      {token === "" ?  <LoginToSpotify setToken={setToken} /> : <Body  token={token} /> }
    </div>
    
  )
}

export default App
