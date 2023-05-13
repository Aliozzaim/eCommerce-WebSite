import React from 'react'
import { useAuth } from '../../contexts/AutContext'
function Profile() {
    const  {user} = useAuth()
  return (
    <div>
        
        {JSON.stringify(user)}
        </div>
  )
}

export default Profile