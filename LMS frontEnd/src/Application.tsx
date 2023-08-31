import { FunctionComponent } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Dashboard/Home";
import Profile from "./Components/Pages/Dashboard/Profile";
import ApplyLeave from "./Components/Pages/Dashboard/ApplyLeave";
import Holidays from "./Components/Pages/Dashboard/Holidays";
import History from "./Components/Pages/Dashboard/History";
import Employees from "./Components/Pages/Dashboard/Employees";
import Dashboard from "./Components/Pages/Dashboard/AdminDashboard";
import LeaveDetails from "./Components/Pages/Dashboard/LeaveDetails";



interface IApplication {}
 
const Application: FunctionComponent<IApplication> = () => {
    
    return (  <>
 
    <BrowserRouter>
   
        <Routes>
            
            <Route path="/" ></Route>
            
            <Route index element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/home" element={<Home/>}>
                    <Route path="/home/profile" element={<Profile/>}/>
                    <Route path="/home/applyLeave" element={<ApplyLeave/>}/>
                    <Route path="/home/holidays" element={<Holidays/>}/>
                    <Route path="/home/history" element={<History/>}/>
                    <Route path="/home/employees" element={<Employees/>}/>
                    <Route path="/home/dashboard" element={<Dashboard/>}/>
                     <Route path="/home/dashboard/home/leave/:id" element={<LeaveDetails/>} /> 

                    
            </Route>
            
        </Routes>
        
    </BrowserRouter>
    
    </>);
}
 
export default Application;