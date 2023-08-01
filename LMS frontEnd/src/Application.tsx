import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./Components/Pages/LogIn";
import SignUp from "./Components/Pages/SignUp";
import Dashboard from "./Components/Pages/Dashboard";

interface IApplication {}
 
const Application: FunctionComponent<IApplication> = () => {
    
    return (  <>
    <BrowserRouter>
    <Routes>
        <Route path="/" >
        <Route index element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signup/dashboard" element={<Dashboard/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </>);
}
 
export default Application;