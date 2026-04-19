import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user}=useContext(UserContext)
    console.log(user)
  
    
      if (!user) {
        return <div>Please login first</div>
      } else {
        return <div>Welcome {user.Username}</div>
    }
  
}

export default Profile
