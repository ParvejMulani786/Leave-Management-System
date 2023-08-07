// import { DatePicker } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const user = useLocation();
  console.log(user);
  return (<>
    <div>Profile</div>
      <p>Name: {user.state.name}</p>
      <p>Role: {user.state.role}</p>
    
    </>
  )
}

export default Profile