import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {}
 
const Layout: FunctionComponent<LayoutProps> = () => {
    
    return (  <>
                <Outlet></Outlet>
              </>
            );
}
 
export default Layout;