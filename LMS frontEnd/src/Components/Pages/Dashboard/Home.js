
import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Image, Menu } from "antd";
import { FileAddOutlined, HomeOutlined, PoweroffOutlined, ProfileOutlined, ScheduleOutlined, UserOutlined,  } from "@ant-design/icons";
import Profile from "./Profile";
import ApplyLeave from "./ApplyLeave";
import Holidays from "./Holidays";
import History from "./History";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import "./Dashboard.css";
import logo from '../../../images/bg.jpg'




 
const Home = () => {
    

    // const user = useLocation();
    // console.log(user.state);
    // console.log(user.state.name);


    
  
    

    
    return (  
        <>
        {/* <h1 style={{textAlign:"center"}}>Dashboard</h1> */}
        
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

  const nav = useNavigate();
  const [user, setUser] = useState();
  const loc = useLocation();
  console.log(loc.state);
  console.log(loc.state.name);
  const vuser = loc.state;
  

  return(
    <>
      <div >
        < Menu
        style={{paddingRight:'1rem'}}
        onClick={({key}) =>{
          if( key === "logout"){
              //do logout feature
          }else{
            nav(key,{state: vuser});
          }
            
        }}
          items ={[
            {label : "Home", key: "/home" , icon: <HomeOutlined />},
            {label : "My Profile", key: "/home/profile",  icon: <UserOutlined />},
            {label : "Apply Leave",key: "/home/applyLeave",   icon:<FileAddOutlined />},
            {label : "Holidays", key: "/home/holidays" , icon: <ScheduleOutlined /> },
            {label : "Leave History",key: "/home/history",   icon: <ProfileOutlined />},
            {label : "Logout", key: "logout",  icon: <PoweroffOutlined />, danger: true},
          ]}>
        </Menu>

          
        
        

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