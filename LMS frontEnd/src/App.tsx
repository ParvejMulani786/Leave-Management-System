import React from "react";
import Application from "./Application";
import { UserProvider  } from "./ContextAPI/UserContext";


 
const App: React.FC = () => {
  
  return ( <>
  <UserProvider>
  <Application/>
  </UserProvider>
  </> );
}
 
export default App;


