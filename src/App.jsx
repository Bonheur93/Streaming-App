import { useState } from 'react'
import './index.css'
import './App.css'
import LoginToSpotify from './components/LoginToSpotify'
import Body from './components/Body'



function App() {
  const [token, setToken] = useState("")
 
  return(
    <div>
      {token === "" ?  <LoginToSpotify token={token} setToken={setToken} /> : <Body /> }


    </div>
    
  )
}

export default App
