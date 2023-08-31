import  { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import { useUser } from '../../../ContextAPI/UserContext';

import'./Dashboard.css'

const LeaveHistoryPage = () => {
  
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [leaveHistory, setLeaveHistory] = useState([]);
  const empId = user.empname;
  console.log(empId);
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    };

    axios.get(`http://[::1]:3000//leaves/${empId}`,config)
      .then(response => {
        console.log('Response:', response.data);
        setLeaveHistory(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [empId]);

  const reversedDataSource = [...leaveHistory].reverse();
  const dataSourceWithIndex = reversedDataSource.map((row, index) => ({ ...row, srNo: index + 1 }));
  

  const columns = [
    {
    title: 'SR. No',
    dataIndex: 'srNo',
    key: 'srNo',
    align: 'center',
  },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      width: 150,
      align: 'center',
    },
    {
      title: 'From Date',
      dataIndex: 'startLeaveDate',
      key: 'fromDate',
      width: 120,
      align: 'center',
    },
    {
      title: 'To Date',
      dataIndex: 'endLeaveDate',
      key: 'endLeaveDate',
      width: 120,
      align: 'center',
    },
     {
      title: 'No of Days',
      dataIndex: 'numOfDay',
      key: 'numOfDay',
      align: 'center',
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      width: 150,
      align: 'center',
      render: session => (session !== "" ? session : 'NA'),
    },
    
    {
      title: 'Leave Status',
      dataIndex: 'leaveStatus',
      key: 'leaveStatus',

      render: (status) => (
      <Tag color={status === 'Pending' ? 'blue' : status === 'Approved' ? 'green' : 'Red'}>
        {status}
      </Tag>
    ),
    },
  ];

  return (
    <>
    <h1 style={{textAlign:'center'}}>Leave History</h1>
    <div className='leaveTable'>
      
      <Table  dataSource={dataSourceWithIndex} columns={columns} />
    </div>
    </>
  );
};

export default LeaveHistoryPage;
