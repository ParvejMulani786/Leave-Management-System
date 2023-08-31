// import { DatePicker } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import "./profile.css";
import { Card, Space } from 'antd';
import { ProfileOutlined, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import logo from "../../../images/profilephoto.png"
import Avatar from 'antd/es/avatar/avatar';
import { useUser } from '../../../ContextAPI/UserContext';

const Profile = () => {
  // const { user, token } = useUser();

  // const user = useLocation();
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  console.log({user});
  console.log(user.empname);
  return (
    <div className='profile' >
     <Card
      style={{ width:350, marginRight:"12rem"}}
          cover = {
            <div
             style={{ 
              width:"100%", 
              height:150,
              background:"linear-gradient(#FF007A, #4200FF)",
              fontSize: 25,
              color:'white',
              paddingBottom:"1rem",
              paddingTop:"1rem",

              }}>
                <UserOutlined/>
                <h2>{user.empname}</h2>
            </div>

          }>
            <Card.Meta 
             style={{
              display:"flex",
              flexDirection:"column",
              marginTop: -55,
             }}
              avatar={
                <Avatar style={{width:"4rem", height:"4rem"}} src={logo}></Avatar>

              }
              title={"FATHOM SOFTWARES LLD"}
              description="@KOLHAPUR"
              >

            </Card.Meta>
            <Space direction='vertical'>
           <div>
            <p> <span style={{fontSize:"1rem",fontFamily:"cursive"}}><span style={{fontFamily:"revert"}}>Name :</span> {user.empname}</span> </p>
          
            <p> <span style={{fontSize:"1rem",fontFamily:"cursive"}}>Gender : {user.gender}</span></p>

            <p> <span style={{fontSize:"1rem",fontFamily:"cursive"}}>DOB : {user.dob}</span></p>

           <p> <span style={{fontSize:"1rem",fontFamily:"cursive"}}>Role : {user.role}</span></p>
          
            <p> <span style={{fontSize:"1rem",fontFamily:"cursive"}}>Contact : {user.contact}</span></p>
          
            <p> <span style={{fontSize:"1rem",fontFamily:"cursive"}}>Email :{user.email}</span></p>
            
            </div>
          
          <p></p>
          </Space>
            
              
        </Card>
      
    </div>
    
  )
}

export default Profile