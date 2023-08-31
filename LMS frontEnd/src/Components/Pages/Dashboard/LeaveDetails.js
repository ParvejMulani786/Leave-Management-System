import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import axios from 'axios';


const LeaveDetail = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [leave, setLeave] = useState(null);
  const [user, setUser] = useState(null);
   const token = sessionStorage.getItem('token');
//   const user = JSON.parse(sessionStorage.getItem('user'));
  
   
  useEffect(() => {
   const headers = {
      Authorization: `Bearer ${token}`
    };
      const leaveId = id;
    axios.get(`http://[::1]:3000/leave/${leaveId}`, { headers })
      .then(response => {
        const leaveData = response.data;
        console.log(leaveData);
        setLeave(leaveData);
        console.log(response.data);
        console.log(leave);
       
       
      })
      .catch(error => {
        console.error('Error fetching leave details:', error);
      });
  }, [id, token , leave?.empId]);

  useEffect(() => {
    if (leave && leave.empId) {
       const empname =  leave.empId;
      axios.get(`http://[::1]:3000/users/by-empId/${empname}`)
        .then(response => {
          setUser(response.data);
          console.log(user);
        })
        .catch(error => {
          console.error('Error fetching user object:', error);
        });
    }
  }, [leave, leave?.empId]);



  if (!leave) {
    return null; // Handle loading state or error
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  width:"75vw",height: '70vh' }}>
    <Card title="Leave Details" style={{ width: 500 }}>
      
      {/* <p>Employee Name: {selectedUser.empname}</p>
      <p>Employee Role: {selectedUser.role}</p>
      <p>Employee Gender: {selectedUser.gender}</p>
      <p>Employee Contact: {selectedUser.contact}</p>
      <p>Employee Email: {selectedUser.email}</p> */}
      {/* <p>Employee Name: {selectedUser.empname}</p> */}
      <p>Leave Type: {leave.leaveType}</p>
      <p>Status: {leave.leaveStatus}</p>
      
    </Card>
    </div>
  );
};

export default LeaveDetail;
