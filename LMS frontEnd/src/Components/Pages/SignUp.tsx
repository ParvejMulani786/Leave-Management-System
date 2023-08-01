import React, { FunctionComponent, useState } from "react";
import { Form, Divider, Input , Button, Typography, message, InputNumber, Select } from 'antd';
import { GoogleOutlined, FacebookFilled, TwitterOutlined}  from '@ant-design/icons'
import '../../App.css';
import { useNavigate } from "react-router-dom";
import  IUser  from "../Model/user";
import  IValidUser  from "../Model/user";

import userService from "../Service/userService";



interface ISignUp {
  user: IUser,
  
}




  
const SignUp: React.FC = () => {
    // const nav = useNavigate();
    const [ state, setState] = useState < ISignUp >({
      user:{
        name : "",
        // gender :"",
        role : "",
        contact : "",
        email : "",
        password : ""
    
      }
       })

       const [ validUser, setValidUser ] = useState < ISignUp >({

        user:{
         
          name : "",
          // gender :"",
          role : "",
          contact : "",
          email : "",
          password : ""
      
        }
         })


       const handleInput = (e: React.ChangeEvent<HTMLInputElement>) :void =>{
          setState({

            user:{
                ...state.user,
                [e.target.name] : e.target.value,

            },
           })
          }

          const sign_up = (e: React.FormEvent<HTMLFormElement>) : void =>{
            //  e.preventDefault();
              console.log(state.user);

                const data : IUser = state.user;
                console.log(data);
                  userService.create(data)
                  .then((response: any) => {
                    setValidUser({
                      
                      user:{
                        name : response.state.user.name,
                        role: response.state.user.role,
                        contact: response.state.user.contact,
                        email: response.state.user.email,
                        password:response.state.user.password,
                        
                      }
                     
                    });
                    console.log(response.state.user);
                  })
                  .catch((e: Error) => {
                    console.log(e);
                  });
          }

    return (  <>
    <div className="appBg">
     <Form className='loginform' onFinish={sign_up}
     labelCol={{ span: 7 }}
     wrapperCol={{ span: 16 }}
     layout="horizontal"
     style={{ maxWidth: 600 }}
     >
      <Typography.Title style={{textAlign:'center'}}>Sign Up</Typography.Title>
      <Form.Item
      rules={[
        {
        required:true,
        type:'string',
        message:'Please enter your name',
        },
        {
          whitespace:true
        },
        { min:3}
      ]} hasFeedback label='Name' name={'name'} >
        
        <Input placeholder='Enter your name' name="name"
      value={state.user.name} onChange={handleInput}/>
      </Form.Item>


      {/* <Form.Item 
      rules = {[{
        required: true,
        message:'Please select your gender',
      }]}
      name={"gender"} label="Gender">
        <Select placeholder="Select your gender"    onChange={handleInput} value={state.user.gender}>
          <Select.Option  name= "male"  value="male">Male</Select.Option>
          <Select.Option  name= "female" value="female">Female</Select.Option>
          <Select.Option  name= "other"  value="other">Other</Select.Option>
        </Select>

      </Form.Item> */}
      
      <Form.Item
      rules={[
        {
        required:true,
        type:'string',
        message:'Please enter valid role',
        whitespace: true,
        min:3,
      },
      
      ]} hasFeedback label='Role' name={'role'} >
        
        <Input  placeholder='Enter your role' name="role" value={state.user.role} onChange={handleInput}/>
      </Form.Item>


      
      <Form.Item
      rules={[
        {
        required:true,
        
         message:'Please enter valid contact',
      },
      ]} hasFeedback label='Contact' name={'contact'} >
        
        <Input 

      placeholder='Enter your contact' name="contact" value={state.user.contact} onChange={handleInput} />
      </Form.Item>

      <Form.Item
      rules={[
        {
        required:true,
        type:'email',
        message:'Please enter valid email',

      },
      ]} hasFeedback label='Email' name={'email'} >
        
        <Input placeholder='Enter your email' name="email" value={state.user.email} onChange={handleInput}/>
      </Form.Item>

      <Form.Item 
       rules={[
        {
        required:true,
        message:'Please enter valid password',
      },
      ]} hasFeedback
      label='Password' name={'password'} >
        <Input.Password placeholder='Enter your password' name="password" value={state.user.password} onChange={handleInput}/>
      </Form.Item>


      {/* <Form.Item 
       name={'confPassword'}
      label='Confirm Password' 
      dependencies={['Password']}
       rules={[
        {
        required:true,
        message:'Please enter confirm password',
      },
      ({ getFieldValue }) => ({
        validator(_, value){
          if( !value || getFieldValue('Password')){
            return Promise.resolve();
          } 
           return Promise.reject("Password does not match ! ");
        },

      }),
      ]} hasFeedback
      >
        <Input.Password placeholder='Enter confirm your password'/>
      </Form.Item> */}

      <Form.Item>
      <Button type='primary' htmlType='submit' block>Sign Up</Button>
      </Form.Item>

      <Divider style={{borderColor:'black'}}> or Sign Up with</Divider>
      <div className='socialLogin'>
        <GoogleOutlined className='socialIcon' style={{color:'red'}}/>
        <FacebookFilled className='socialIcon'  style={{color:'blue'}}/>
        <TwitterOutlined className='socialIcon'  style={{color:'cyan'}}/>
       
      </div>
     
     </Form>

        
     {/* <p style={{color:'white'}}>User object is: {JSON.stringify(state.user)}</p> */}
   


    </div>

    </>);
}
 
export default SignUp;