
import React from "react";
import '../../App.css';

import { Form,  Input , Button, Typography, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined}  from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useUser } from "../../ContextAPI/UserContext";




interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}


const SignIn : React.FC = () =>{
const { setUser, setToken } = useUser();
  const nav = useNavigate();

  const onFinish = async (values: FormValues) => {
    try {
      const response = await axios.post('http://[::1]:3000/signin', {
        email: values.email,
        password: values.password,
      });
       const token = response.data.token;
        const user = response.data.user;

         // Store data in local storage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        
       setUser(user);
       setToken(token);
     

       console.log('Successfully authenticated with User:', user);

      console.log('Successfully authenticated with token:', token);
       message.success("Successful Signin");
      nav("/home")


    } catch (error) {
      console.error('Authentication failed:', error);
      message.error("Invalid Credentials!");
    }
  };

    
    return(
        <>
        <div className="appBg">
     <Form
      className='loginform'
      initialValues={{ remember: true }} 
      onFinish={onFinish}>

      <Typography.Title style={{textAlign:'center'}}>Signin</Typography.Title>

      <Form.Item
      rules={[
        {
        required:true,
        type:'email',
        message:'Please enter valid email',
      },
      ]} hasFeedback label='Email' name={'email'}
       >
        
        <Input prefix={<UserOutlined />}  placeholder='Enter your email'/>
      </Form.Item>

      <Form.Item 
       rules={[
        {
        required:true,
        message:'Please enter valid password',
      },
      ]} hasFeedback
      label='Password'  name={'password'} >
        <Input.Password  prefix={<LockOutlined />} type="password" placeholder='Enter your password'/>
      </Form.Item>

      <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a href="/">Forgot password</a>
      </Form.Item>

      <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Signin
            </Button>
      </Form.Item>
      <Form.Item style={{paddingLeft:"10rem"}}>
        <span >
            Or &nbsp; &nbsp; <a href="/signUp">Sign Up now!</a>
            </span>
      </Form.Item>
      
     </Form>

    </div>
        </>
    )
}

export default SignIn;