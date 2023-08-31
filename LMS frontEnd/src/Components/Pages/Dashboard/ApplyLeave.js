import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Typography, Checkbox, Radio, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import moment from 'moment';
import "./profile.css";
import {  useNavigate } from 'react-router-dom';
// import userService from '../../Service/userService';
import axios from 'axios';
import { useUser } from '../../../ContextAPI/UserContext';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ApplyLeave = () => {
    // const { user, token } = useUser();
  // const user = useLocation();
  // const nav = useNavigate();
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));

   console.log(user);
   console.log(user.email);

  const [formData, setFormData] = useState({
    empId: user.empname,
    leaveType: '',
    leaveDetails: '',
    startLeaveDate: null,
    endLeaveDate: null,
    numOfDay: 0,
    leaveStatus: 'Pending',
    session: '',

    // dateRange: [],
  });
  const [isChecked, setIsChecked] = useState(false);
  const [session, setSession] = useState(null);

  const initialState = {
                        empId : "",
                        leaveType : '',
                        leaveDetails : '',
                        startLeaveDate: null,
                        endLeaveDate : null,
                        numOfDay : 0,
                        leaveStatus : '',
                        session : '',
  }

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setSession(null);
  };

  const handleRadioChange = (e) => {
    setSession(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      session: session,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      empId: user.empname,
      leaveStatus:'Pending',
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      leaveType: value,
      
    }));
  };

  const handleDateRangeChange = (dates) => {

    const [ startLeaveDate, endLeaveDate ] = dates;
    setFormData((prevData) => ({
      ...prevData,
      
      startLeaveDate : startLeaveDate ? startLeaveDate.format('YYYY-MM-DD') : null,
      endLeaveDate : endLeaveDate ? endLeaveDate.format('YYYY-MM-DD') : null,
      numOfDay: (Math.ceil((endLeaveDate - startLeaveDate ) / (1000 * 60 * 60 * 24)) + 1).toString() ,
     
    }));
  
     };
  

  const handleSubmit = (e) => {
     e.preventDefault();
     if(isChecked){
         console.log('Data to save cheked:', formData);
     }else{
        formData.session = "";
        console.log('Data to save uncheked:', formData);
     }
    
    const data = formData;
    setFormData(initialState, setIsChecked(false))
  
    // make axios call for API
     const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request using Axios
    axios.post('http://[::1]:3000/leave', data, config)
      .then(response => {
        console.log('Response:', response.data);
        console.log('Response:', response);
      
         message.success("Your application has been submitted successfully");
      })
      .catch(error => {
        console.error('Error:', error);
        
      });

     };

  return (
    <div className='leaveBG'>
    <Form
        className='LeavePage' 
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 25 }}
        layout="horizontal"
        
        // style={{ maxWidth: 900 }}
       >
      <Typography.Title style={{textAlign:'center', color:'black', marginTop:"-12rem", marginBottom:"2rem"}}>Leave Application</Typography.Title>

      <FormItem label="Select Leave Type" style={{  marginLeft:"1.5rem", width:"25rem", textAlign:"center"}}>
            <Select
              placeholder="Select Leave Type"
              name="leaveType"
              value={formData.leaveType}
              style={{ width: '100%' }}
              onChange={handleSelectChange}
              
            >
              <Option value="Casual leave">Casual Leave</Option>
              <Option value="Sick leave">Sick Leave</Option>
              
            </Select>
      </FormItem>
  

      <Form.Item label="Leave period">
        <RangePicker value= {[
          formData.startLeaveDate ? moment(formData.startLeaveDate) : null,
           formData.endLeaveDate ? moment(formData.endLeaveDate) : null,]} 
           onChange={handleDateRangeChange} />
      </Form.Item>

      <div style={{display:'flex', marginLeft:"6rem"}} >
       <Form.Item label="Days:" >
        <Input style={{ marginLeft:"1rem",width:"3rem"}} name="numOfDay" value={formData.numOfDay} onChange={handleInputChange} />
      </Form.Item>

      <Form.Item style={{marginLeft:"1.5rem"}} >
        <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
        Half day
      </Checkbox>
      {isChecked && (
        <div style={{display:'flex'}}>
          <Radio.Group onChange={handleRadioChange} value={formData.session}>
            <Radio value={"Morning session"}>Morning session</Radio>
            <Radio value={"Afternoon session"}>Afternoon session</Radio>
          </Radio.Group>
        </div>
      )}
      </Form.Item>

      </div>

      <Form.Item label="Leave Reason">
        <Input.TextArea rows={6} cols={48}name="leaveDetails" value={formData.leaveDetails} onChange={handleInputChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          SUBMIT APPLICATION
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default ApplyLeave;
