
import React from "react";
import '../../App.css';

import { Form, Divider, Input , Button, Typography, message } from 'antd';
import { GoogleOutlined, FacebookFilled, TwitterOutlined}  from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
const login = () =>{
  message.success('Login Successful!')
}

const LogIn : React.FC = () =>{
    const nav = useNavigate();
    return(
        <>
        <div className="appBg">
     <Form className='loginform' onFinish={login}>
      <Typography.Title style={{textAlign:'center'}}>Login</Typography.Title>
      <Form.Item
      rules={[
        {
        required:true,
        type:'email',
        message:'Please enter valid email',
      },
      ]} label='Email' name={'myEmail'} >
        
        <Input placeholder='Enter your email'/>
      </Form.Item>

      <Form.Item 
       rules={[
        {
        required:true,
        message:'Please enter valid password',
      },
      ]}
      label='Password' name={'myPassword'} >
        <Input.Password placeholder='Enter your password'/>
      </Form.Item>
      <Button type='primary' htmlType='submit' block>Login</Button>

      <Divider style={{borderColor:'black'}}> or Login with</Divider>
      <div className='socialLogin'>
        <GoogleOutlined className='socialIcon' onClick={login} style={{color:'red'}}/>
        <FacebookFilled className='socialIcon' onClick={login}  style={{color:'blue'}}/>
        <TwitterOutlined className='socialIcon' onClick={login}  style={{color:'cyan'}}/>
        <Button type='text' style={{color:'blue'}} onClick={()=> nav("/signUp")}>Sign Up</Button>
      </div>
      <div className='register'>
        
      </div>
     </Form>

    </div>
        </>
    )
}

export default LogIn;