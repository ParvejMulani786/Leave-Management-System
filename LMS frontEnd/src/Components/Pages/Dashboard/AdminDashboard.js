import React, { useEffect, useState } from 'react';
import { Table, Button, Tag } from 'antd';
import "./Dashboard.css"
import axios from 'axios';
import LeaveDetails from './LeaveDetails';
import { useNavigate } from 'react-router-dom';




const handleViewClick = (applicationId) => {
  // Handle the view button click, for example, redirect to the application details page
};


const AdminDashboard = () => {
  const navigate =useNavigate();
  const [selectedLeave, setSelectedLeave] = useState(null);
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const[leaveData, setLeaveData] = useState([]);

  console.log(user);

  useEffect(() => {
  
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    const data = user.id;
    console.log( "data" + data);

    axios.post('http://[::1]:3000/allLeaves', data , config )
      .then(response => {
        console.log('Response:', response.data);
        setLeaveData(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave data:', error);
      });
  }, []);

  const reversedDataSource = [...leaveData].reverse();
  const dataSourceWithIndex = reversedDataSource.map((row, index) => ({ ...row, srNo: index + 1 }));

  const columns = [
     {
    title: 'SR. No',
    dataIndex: 'srNo',
    key: 'srNo',
    align: 'center',
  },
  
  {
    title: 'Employee Name',
    dataIndex: 'empId',
    key: 'empId',
    align:'center',
    
  },
  {
    title: 'Leave Type',
    dataIndex: 'leaveType',
    key: 'leaveType',
    align:'center',
  },
  {
    title: 'Leave Date From',
    dataIndex: 'startLeaveDate',
    key: 'startLeaveDate',
    align:'center',
  },
   {
    title: 'Leave Date To',
    dataIndex: 'endLeaveDate',
    key: 'endLeaveDate',
    align:'center',
  },
   
  {
    title: 'Leave Status',
    dataIndex: 'leaveStatus',
    key: 'leaveStatus',
    align:'center',
     render: (status) => (
      <Tag color={status === 'Pending' ? 'blue' : status === 'Approved' ? 'green' : 'Red'}>
        {status}
      </Tag>),
  },
  {
    title: 'Leave Session',
    dataIndex: 'session',
    key: 'session',
    align:'center',
    render: session => (session !== "" ? session : 'NA'),
  },
  {
    title: 'Action',
    key: 'action',
    align:'center',
    render: (_, record) => (
        <Button type="primary" onClick={() => handleViewClick(record)}>
          View
        </Button>
      ),
  },
];

 
  const handleViewClick = (selectedLeave) => {
    // Redirect to the detailed view component with the selected leave object
    console.log("selected id" + selectedLeave.leaveId);
    navigate(`home/leave/${selectedLeave.leaveId}`);
  };


  return (
    <>
    <h1 style={{textAlign:'center'}}>Admin Dashboard</h1>
    <div className='adminDashboard'>
      
      <Table dataSource={ dataSourceWithIndex } columns={columns} />
       
    </div>
    </>
  );
};

export default AdminDashboard;
