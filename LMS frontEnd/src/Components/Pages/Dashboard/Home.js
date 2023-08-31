
import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Image, Layout, Menu } from "antd";
import { DashboardFilled, DashboardOutlined, FileAddOutlined, HomeOutlined, PoweroffOutlined, ProfileOutlined, ScheduleOutlined, TeamOutlined, UserOutlined,  } from "@ant-design/icons";
import Profile from "./Profile";
import ApplyLeave from "./ApplyLeave";
import Holidays from "./Holidays";
import History from "./History";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import "./Dashboard.css";
import logo from '../../../images/bg.jpg'
import { useUser } from "../../../ContextAPI/UserContext";
import Employees from "./Employees";
import Dashboard from "./AdminDashboard";
import Sider from "antd/es/layout/Sider";




 
const Home = () => {
  
    return (  
        <>
      
      <div> 
        <Header/>
      </div>
              <div style={{ display: 'flex', flexDirection:'row'}}>
               
              <SideMenu />
              <Content />
              </div>
        
      <div> 
          {/* <Footer/> */}
     </div>
        
       
       

        </>);
}

function SideMenu(){

  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));


  const nav = useNavigate();

  const vuser = user;

  console.log(user);
  
  

  return(
    <>
      <div >
         <Layout style={{ minHeight: '100vh' }}>
          <Sider width={200}>
        < Menu
        mode="vertical" theme="dark" defaultSelectedKeys={['1']}
        style={{paddingRight:'1rem'}}
        onClick={({key}) =>{
          if( key === "signout"){
              
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('user');
              
              nav("/");

          }
          else{
            nav(key,{state: vuser});
          }
        
            
        }}
          items ={[
           
            {label : "Home", key: "/home" , icon: <HomeOutlined />},
             vuser.role === 'Admin'? {label : "Dashboard", key: "/home/dashboard",  icon: <DashboardOutlined />} : "",
            {label : "My Profile", key: "/home/profile",  icon: <UserOutlined />},
            vuser.role === 'Admin'? {label : "Employees", key: "/home/employees",  icon: <TeamOutlined />} : "",
            {label : "Apply Leave",key: "/home/applyLeave",   icon:<FileAddOutlined />},
            {label : "Holidays", key: "/home/holidays" , icon: <ScheduleOutlined /> },
            {label : "Leave History",key: "/home/history",   icon: <ProfileOutlined />},
            {label : "Signout", key: "signout",  icon: <PoweroffOutlined />, danger: true},
          ]}>
        </Menu>
        </Sider>
          </Layout>
        </div>
        
    </>
  )
}

function Content() {
  const [Header, setHeader] = useState(false)
  const location = useLocation();
  
  useEffect(()=> {
          console.log("useffect called");
         setHeader(location.pathname === "/home")
  },[location])
  
  return (
      <div>
          {Header ? <HomePage/> : <Outlet />}
      </div>
  )
}

function Header(){
  return(
    <>
    <div className="header">
      {/* <Image src={logo} ></Image> */}
      <u><h3>Leave Management System</h3></u>
    </div>
    </>
  )
}
 
export default Home;