// Beispiel für Login Komponente, die mit UserContext kommuniziert
import React, { useState } from 'react'
import { useUser } from '../context/UserContext'


export default function Login() {
    
    const {handleUserLogin} = useUser()
    const [username, setUsername] = useState("")
  
    function handleSubmit(e){
        e.preventDefault()
        handleUserLogin(username)
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>        
        <input type="submit" value={"Login"} />
    </form>
  )
}
