import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";

interface DashboardProps {}
 
const Dashboard: FunctionComponent<DashboardProps> = () => {
    const user = useLocation();
    
    return (  
        <>
        <h1>Dashboard</h1>
        </>);
}
 
export default Dashboard;