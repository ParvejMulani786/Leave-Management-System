import { FunctionComponent } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LogIn from "./Components/Pages/LogIn";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Dashboard/Home";
import Profile from "./Components/Pages/Dashboard/Profile";
import ApplyLeave from "./Components/Pages/Dashboard/ApplyLeave";
import Holidays from "./Components/Pages/Dashboard/Holidays";
import History from "./Components/Pages/Dashboard/History";


interface IApplication {}
 
const Application: FunctionComponent<IApplication> = () => {
    
    return (  <>
    <BrowserRouter>
        <Routes>
            <Route path="/" ></Route>
            <Route index element={<LogIn/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/home" element={<Home/>}>
                    <Route path="/home/profile" element={<Profile/>}/>
                    <Route path="/home/applyLeave" element={<ApplyLeave/>}/>
                    <Route path="/home/holidays" element={<Holidays/>}/>
                    <Route path="/home/history" element={<History/>}/>
                    
            </Route>
        </Routes>
    </BrowserRouter>
    </>);
}
 
export default Application;