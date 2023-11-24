import React from 'react'
import { useState,useEffect } from 'react'
import {jwtDecode} from 'jwt-decode'

import "./App.css"

const App = () => {
  const [user, setUser] = useState({})

  const handleCallbackResponse = (response) => {

      const jwt = response.credential
      const decoded = jwtDecode(jwt)
      setUser(decoded)
      console.log(decoded)
      document.getElementById("signIndiv").style.display = "none"
    
 

  }

  const handleLogout = () => {
    setUser({})
    document.getElementById("signIndiv").style.display = "block"
  
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:"739492583599-vtc9pakolo3vsanmgap3766ts0m7us5v.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(document.getElementById("signIndiv"),{
      theme: "outline",
      size : "large",

    })

    google.accounts.id.prompt();
  }, [])
  return (
    <div
     className='App'
    >
      <div
       id = "signIndiv"
      ></div>

      {Object.keys(user).length !== 0 && 
       (
        <button
         onClick={handleLogout}
        >Sign Out</button>
       )
      }

      {user && 
        (
          <div>

            <h1>{user.name}</h1>
            <img src={user.picture} alt="" />

          </div>
        )
      }
    </div>
  )
}

export default App