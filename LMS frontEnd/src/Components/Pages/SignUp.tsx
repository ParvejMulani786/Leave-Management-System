import React, { FunctionComponent, useState } from "react";
import { Form, Divider, Input , Button, Typography, message, InputNumber, Select, DatePicker } from 'antd';
import { GoogleOutlined, FacebookFilled, TwitterOutlined}  from '@ant-design/icons'
import '../../App.css';
import { useNavigate } from "react-router-dom";
import {Moment} from "moment";
import userService from "../Service/userService";
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';

export  interface IUser {
        email : string,
        empname : string, 
        gender :string,
        dob1?: Dayjs | null,
        dob : string,
        role : string,
        contact : string,
        password : string,
}

  
const SignUp: React.FC = () => {
    const nav = useNavigate();
    const [form] = Form.useForm();
    const [ formData, setFormData] = useState<IUser>({
        email : "",
        empname : "", 
        gender :"",
        // dob1 : null,
        dob: "",
        role : "",
        contact: "",
        password : "",
    });

  const [ gender, setGender ] = useState<string | undefined>();
  // const [ dob1, setDob] = useState<Dayjs | null>(null);
      
  const handleOptionChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({
      ...prevData,
      //  dob1: date,
       dob: date?.format('YYYY-MM-DD') || ''
    }));
  };

     const handleSave = () => {
    
        console.log('Data to save:', formData);
        let userAuth: boolean = false;

              //User Authorization 
              if(formData.empname === 'Deepak Madnaik' && formData.role === 'Admin' && formData.email === 'deepak@fathomable.com'){
                  userAuth = true;
              }
              else if ( formData.role !== 'Admin' && formData.email !== 'deepak@fathomable.com' ){
                   userAuth = true;
              }

              if(userAuth){
                   userService.create(formData)
                  .then((response: any) => {
                    console.log(response.data.name);
                    console.log(response.data.userId);
                    console.log(response.data);
                    let vUser = response.data;
                    message.success(" User SignUp Successful! Please Signin.");
                    nav("/");
                  })
                  .catch((e: any) => {
                    console.log(e);
                     message.error("Error!!");
                  });

              }
              else{
                alert("Invalid User!!");
              }
          }

    return (  <>
    <div className="appBg">
     <Form  className='signUpform' onFinish={handleSave}
     labelCol={{ span: 7 }}
     wrapperCol={{ span: 25 }}
     layout="horizontal"
     style={{ maxWidth: 900 }}
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
      ]} hasFeedback label='Name' name={'empname'} >
        
        <Input placeholder='Enter your name' name="empname"
      value={formData.empname} onChange={handleInputChange}/>
      </Form.Item>


      <Form.Item 
      rules = {[{
        required: true,
        message:'Please select your gender',
      }]}
      name={"gender"} label="Gender">
        <Select 
        value={formData.gender}
        placeholder="Select your gender"
        onChange={handleOptionChange} 
        
        >
          <Select.Option  name= "gender"  value="male">Male</Select.Option>
          <Select.Option  name= "gender" value="female">Female</Select.Option>
          <Select.Option  name= "gender"  value="other">Other</Select.Option>
        </Select>

      </Form.Item>
      
      <Form.Item label="DOB">
      <DatePicker value={formData. dob1} onChange={handleDateChange} />    
      </Form.Item>

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
        
        <Input  placeholder='Enter your role' name="role" value={formData.role} onChange={handleInputChange}/>
      </Form.Item>


      
      <Form.Item
      rules={[
        {
        required:true,
        
         message:'Please enter valid contact',
      },
      ]} hasFeedback label='Contact' name={'contact'} >
        
        <Input 

      placeholder='Enter your contact' name="contact" value={formData.contact} onChange={handleInputChange} />
      </Form.Item>

      <Form.Item
      rules={[
        {
        required:true,
        type:'email',
        message:'Please enter valid email',

      },
      ]} hasFeedback label='Email' name={'email'} >
        
        <Input placeholder='Enter your email' name="email" value={formData.email} onChange={handleInputChange}/>
      </Form.Item>

      <Form.Item 
       rules={[
        {
        required:true,
        message:'Please enter valid password',
      },
      ]} hasFeedback
      label='Password' name={'password'} >
        <Input.Password placeholder='Enter your password' name="password" value={formData.password} onChange={handleInputChange}/>
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

      
      <Button  type='primary' htmlType='submit' block >Sign Up</Button>
      

      {/* <Divider style={{borderColor:'black'}}> or Sign Up with</Divider>
      <div className='socialLogin'>
        <GoogleOutlined className='socialIcon' style={{color:'red'}}/>
        <FacebookFilled className='socialIcon'  style={{color:'blue'}}/>
        <TwitterOutlined className='socialIcon'  style={{color:'cyan'}}/>
       
      </div> */}
     
     </Form>

        
     {/* <p style={{color:'white'}}>User object is: {JSON.stringify(state.user)}</p> */}
   


    </div>

    </>);
}
 
export default SignUp;